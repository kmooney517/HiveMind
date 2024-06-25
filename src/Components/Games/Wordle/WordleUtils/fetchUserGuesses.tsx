import {getSupabaseClient} from '@supabaseClient';

export const fetchUserGuesses = async (
	selectedDate: string,
	currentUser: string | undefined,
) => {
	try {
		const supabase = getSupabaseClient();
		// Fetch all guesses for the selected date
		const {data: guessesData, error: guessesError} = await supabase
			.from('user_guesses')
			.select('*')
			.eq('date', selectedDate);

		if (guessesError) {
			throw guessesError;
		}

		// Check if the current user has submitted a guess for the selected date
		const currentUserGuess = guessesData.some(
			(guess: any) => guess.user_id === currentUser,
		);

		// Fetch user profiles based on user_ids from the guesses
		const userIds = guessesData.map((guess: any) => guess.user_id);
		const {data: profilesData, error: profilesError} = await supabase
			.from('profiles')
			.select('id, email')
			.in('id', userIds);

		if (profilesError) {
			throw profilesError;
		}

		const userEmailMap = profilesData.reduce((acc: any, profile: any) => {
			acc[profile.id] = profile.email;
			return acc;
		}, {});

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

			return {
				...guess,
				email: userEmailMap[guess.user_id],
				guess: formattedGuesses,
				guessesTaken: formattedGuesses.filter((row: any) =>
					row.some((cell: any) => cell.letter !== ''),
				).length,
				// advantage: calculateAdvantage(guess.guess) // Keep this commented for now
			};
		});

		return {combinedData, currentUserHasGuessed: currentUserGuess};
	} catch (error) {
		console.error('Error fetching user guesses:', error.message || error);
		return {combinedData: [], currentUserHasGuessed: false};
	}
};
