import {handleGuess} from './handleGuess';
import {handleInputChange} from './handleInputChange';

export const handleKeyPress = (
	key: string,
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
	inputs: React.MutableRefObject<Array<Array<React.RefObject<any>>>>,
	userId: string | null,
) => {
	// Check if the last guess was all green or if the user has already made six guesses
	const lastGuess = guesses[currentRow - 1];
	const allGreen =
		lastGuess && lastGuess.every(cell => cell.color === 'green');
	const maxGuessesReached = currentRow >= 6;

	if (allGreen || maxGuessesReached) {
		return; // Disable all keypresses
	}

	if (key === 'BACKSPACE') {
		const newGuesses = [...guesses];
		for (let col = 4; col >= 0; col--) {
			if (newGuesses[currentRow][col].letter) {
				newGuesses[currentRow][col] = {letter: '', color: 'white'};
				setGuesses(newGuesses);
				return;
			}
		}
	} else if (key === 'ENTER') {
		handleGuess(
			currentRow,
			guesses,
			setGuesses,
			solution,
			setLetterColors,
			setMessage,
			setCurrentRow,
			userId,
		);
	} else {
		for (let col = 0; col < 5; col++) {
			if (!guesses[currentRow][col].letter) {
				handleInputChange(
					key,
					currentRow,
					col,
					guesses,
					setGuesses,
					inputs,
				);
				return;
			}
		}
	}
};
