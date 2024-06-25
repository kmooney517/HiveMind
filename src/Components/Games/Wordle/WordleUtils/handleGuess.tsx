import {Alert} from 'react-native';
import {getSupabaseClient} from '@supabaseClient';
import {updateColors} from './updateColors';
import {validateGuess} from './validateGuess';

export const handleGuess = async (
	currentRow: number,
	guesses: {letter: string; color: string}[][],
	setGuesses: React.Dispatch<
		React.SetStateAction<{letter: string; color: string}[][]>
	>,
	solution: string,
	setLetterColors: React.Dispatch<
		React.SetStateAction<{[key: string]: string}>
	>,
	setMessage: React.Dispatch<React.SetStateAction<string>>,
	setCurrentRow: React.Dispatch<React.SetStateAction<number>>,
	userId: string,
) => {
	const guess = guesses[currentRow]
		.map(g => g.letter)
		.join('')
		.toLowerCase();

	console.log('Current Guess:', guess);

	const isValid = await validateGuess(guess);
	if (!isValid) {
		return;
	}

	if (guess.length < 5) {
		Alert.alert('Not enough letters');
		return;
	}

	const solutionLower = solution.toLowerCase();
	const {newGuesses, newLetterColors} = updateColors(
		guess,
		solutionLower,
		currentRow,
		guesses,
		setGuesses,
		setLetterColors,
	);

	console.log('Updated Guesses:', newGuesses);

	setGuesses(newGuesses);
	setLetterColors(prevColors => ({...prevColors, ...newLetterColors}));

	if (guess === solutionLower) {
		setMessage('Correct!');
	} else {
		setMessage('Try again.');
		if (currentRow < 5) {
			setCurrentRow(currentRow + 1);
		}
	}

	try {
		const supabase = getSupabaseClient();
		const {data, error} = await supabase
			.from('user_guesses')
			.select('*')
			.eq('user_id', userId)
			.eq('date', new Date().toISOString().split('T')[0]);

		if (error) {
			throw error;
		}

		let userGuesses = data[0]?.guess || [];
		userGuesses[currentRow] = newGuesses[currentRow];

		console.log('User Guesses to be upserted:', userGuesses);

		const {error: upsertError} = await supabase.from('user_guesses').upsert(
			{
				user_id: userId,
				date: new Date().toISOString().split('T')[0],
				guess: userGuesses,
				created_at: new Date().toISOString(),
			},
			{onConflict: ['user_id', 'date']},
		);

		if (upsertError) {
			throw upsertError;
		}

		console.log('Guesses upserted successfully');
	} catch (error: any) {
		console.error('Error saving user guesses:', error.message || error);
	}
};
