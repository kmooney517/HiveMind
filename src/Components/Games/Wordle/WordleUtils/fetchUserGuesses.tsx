import {getSupabaseClient} from '@supabaseClient';

export const fetchUserGuesses = async (selectedDate, currentUser, hiveId) => {
	try {
		const supabase = getSupabaseClient();

		const {data: membersData, error: membersError} = await supabase
			.from('hive_memberships')
			.select('user_id, profiles(name)')
			.eq('hive_id', hiveId);

		if (membersError) {
			throw membersError;
		}

		const hiveMembers = membersData.map(member => ({
			user_id: member.user_id,
			name: member.profiles.name,
		}));

		const {data: guessesData, error: guessesError} = await supabase
			.from('user_guesses')
			.select('*')
			.eq('date', selectedDate)
			.in(
				'user_id',
				hiveMembers.map(member => member.user_id),
			);

		if (guessesError) {
			throw guessesError;
		}

		// Fetch the starter word for the hive and the current date
		const {data: starterWordData, error: starterWordError} = await supabase
			.from('starter_words')
			.select('starter_word')
			.eq('hive_id', hiveId)
			.eq('date', selectedDate);

		if (starterWordError) {
			throw starterWordError;
		}

		const starterWord = starterWordData?.[0]?.starter_word || null;

		const combinedData = guessesData.map(guess => {
			const formattedGuesses = guess.guess.map(row => {
				if (Array.isArray(row)) {
					return row.map(cell => ({
						letter: cell.letter || '',
						color: cell.color || 'white',
					}));
				} else {
					return Array(5).fill({letter: '', color: 'white'});
				}
			});

			while (formattedGuesses.length < 6) {
				formattedGuesses.push(
					Array(5).fill({letter: '', color: 'white'}),
				);
			}

			const rowsWithGuesses = formattedGuesses.filter(row =>
				row.some(cell => cell.letter !== ''),
			);

			const lastRow = rowsWithGuesses[rowsWithGuesses.length - 1];
			const allGreen =
				lastRow && lastRow.every(cell => cell.color === 'green');
			const maxGuessesReached = rowsWithGuesses.length >= 6;

			const completedToday = allGreen || maxGuessesReached;

			const member = hiveMembers.find(
				_member => _member.user_id === guess.user_id,
			);

			return {
				...guess,
				guess: formattedGuesses,
				guessesTaken: rowsWithGuesses.length,
				name: member?.name || guess.user_id,
				completedToday,
			};
		});

		// Add hive members who have not started the game today
		const notStartedMembers = hiveMembers
			.filter(
				member =>
					!combinedData.some(
						guess => guess.user_id === member.user_id,
					),
			)
			.map(member => {
				const initialGuesses = Array(6).fill(
					Array(5).fill({letter: '', color: 'white'}),
				);

				// If a starter word is set, make it the first guess
				if (starterWord) {
					initialGuesses[0] = starterWord
						.split('')
						.map(letter => ({letter, color: 'white'}));
				}

				return {
					user_id: member.user_id,
					guess: initialGuesses,
					guessesTaken: starterWord ? 1 : 0,
					name: member.name,
					completedToday: false,
				};
			});

		const finalData = [...combinedData, ...notStartedMembers];

		const todayCompleted = finalData.some(
			guess => guess.user_id === currentUser && guess.completedToday,
		);

		return {
			combinedData: finalData,
			todayCompleted,
		};
	} catch (error) {
		console.error('Error fetching user guesses:', error.message || error);
		return {
			combinedData: [],
			todayCompleted: false,
		};
	}
};
