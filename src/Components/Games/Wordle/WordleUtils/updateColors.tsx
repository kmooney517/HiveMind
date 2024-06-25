const setColors = (
	row: number,
	guess: string,
	solutionLower: string,
	newGuesses: {letter: string; color: string}[][],
	newLetterColors: {[key: string]: string},
) => {
	for (let i = 0; i < 5; i++) {
		const letter = newGuesses[row][i].letter.toLowerCase();
		if (letter === solutionLower[i]) {
			newGuesses[row][i].color = 'green';
			newLetterColors[letter.toUpperCase()] = 'green';
		} else if (solutionLower.includes(letter)) {
			if (newGuesses[row][i].color !== 'green') {
				newGuesses[row][i].color = 'yellow';
				if (newLetterColors[letter.toUpperCase()] !== 'green') {
					newLetterColors[letter.toUpperCase()] = 'yellow';
				}
			}
		} else {
			newGuesses[row][i].color = 'gray';
			if (!newLetterColors[letter.toUpperCase()]) {
				newLetterColors[letter.toUpperCase()] = 'gray';
			}
		}
	}
};

export const updateColors = (
	guess: string,
	solution: string,
	currentRow: number,
	guesses: {letter: string; color: string}[][],
): {
	newGuesses: {letter: string; color: string}[][];
	newLetterColors: {[key: string]: string};
} => {
	const solutionLower = solution.toLowerCase();
	const newGuesses = [...guesses];
	const newLetterColors: {[key: string]: string} = {};

	for (let row = 0; row <= currentRow; row++) {
		setColors(row, guess, solutionLower, newGuesses, newLetterColors);
	}

	return {newGuesses, newLetterColors};
};
