export const handleInputChange = (
	value: string,
	row: number,
	col: number,
	guesses: {letter: string; color: string}[][],
	setGuesses: React.Dispatch<
		React.SetStateAction<{letter: string; color: string}[][]>
	>,
	inputs: React.MutableRefObject<Array<Array<React.RefObject<any>>>>,
) => {
	const newGuesses = guesses.map((rowGuess, rowIndex) =>
		rowGuess.map((cell, colIndex) => {
			if (rowIndex === row && colIndex === col) {
				return {
					...cell,
					letter: value.slice(-1).toUpperCase(),
					color: 'white',
				};
			}
			return cell;
		}),
	);

	setGuesses(newGuesses);

	// Focus logic
	if (value) {
		if (col < 4) {
			// Automatically focus the next input in the same row if not at the end of the row
			const nextInput = inputs?.current?.[row]?.[col + 1];
			if (nextInput?.current) {
				nextInput.current.focus();
			}
		} else if (col === 4 && row < 5) {
			// Move to the first input of the next row
			const firstInputNextRow = inputs?.current?.[row + 1]?.[0];
			if (firstInputNextRow?.current) {
				firstInputNextRow.current.focus();
			}
		}
	}
};
