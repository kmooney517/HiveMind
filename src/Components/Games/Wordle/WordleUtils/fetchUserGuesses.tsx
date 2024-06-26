import {getSupabaseClient} from '@supabaseClient';

export const fetchUserGuesses = async (
	selectedDate: string,
	currentUser: string | undefined,
	hiveId: string | undefined,
) => {
	try {
		const supabase = getSupabaseClient();

		// Fetch members of the hive
		const {data: membersData, error: membersError} = await supabase
			.from('hive_memberships')
			.select('user_id, profiles(name)')
			.eq('hive_id', hiveId);

		if (membersError) {
			throw membersError;
		}

		const hiveMembers = membersData.map((member: any) => ({
			user_id: member.user_id,
			name: member.profiles.name,
		}));

		// Fetch all guesses for the selected date from hive members
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

		let todayCompleted = false;

		// Check if the current user has submitted a guess for the selected date
		const currentUserGuess = guessesData.some(
			(guess: any) => guess.user_id === currentUser,
		);

		const combinedData = guessesData.map((guess: any) => {
			const formattedGuesses = guess.guess.map((row: any) => {
				if (Array.isArray(row)) {
					return row.map((cell: any) => ({
						letter: cell.letter || '',
						color: cell.color || 'white',
					}));
				} else {
					return Array(5).fill({letter: '', color: 'white'});
				}
			});

			// Pad the guesses array to always have 6 rows
			while (formattedGuesses.length < 6) {
				formattedGuesses.push(
					Array(5).fill({letter: '', color: 'white'}),
				);
			}

			const rowsWithGuesses = formattedGuesses.filter(row =>
				row.some(cell => cell.letter !== ''),
			);

			// Check if the last row with a guess is all green
			const lastRow = rowsWithGuesses[rowsWithGuesses.length - 1];
			const allGreen =
				lastRow && lastRow.every(cell => cell.color === 'green');
			const maxGuessesReached = rowsWithGuesses.length >= 6;

			todayCompleted = allGreen || maxGuessesReached;

			const member = hiveMembers.find(
				member => member.user_id === guess.user_id,
			);

			return {
				...guess,
				guess: formattedGuesses,
				guessesTaken: formattedGuesses.filter((row: any) =>
					row.some((cell: any) => cell.letter !== ''),
				).length,
				name: member?.name || guess.user_id,
			};
		});

		return {
			combinedData,
			currentUserHasGuessed: currentUserGuess,
			todayCompleted,
		};
	} catch (error) {
		console.error('Error fetching user guesses:', error.message || error);
		return {
			combinedData: [],
			currentUserHasGuessed: false,
			todayCompleted: false,
		};
	}
};
