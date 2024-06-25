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

			return {
				...guess,
				guess: formattedGuesses,
				guessesTaken: formattedGuesses.filter((row: any) =>
					row.some((cell: any) => cell.letter !== ''),
				).length,
				// advantage: calculateAdvantage(guess.guess) // Keep this commented for now
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
