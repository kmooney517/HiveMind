export const buildLetterColors = (formattedGuesses: any) => {
	const letterColors: {[key: string]: string} = {};

	formattedGuesses.forEach((row: any) => {
		row.forEach((cell: any) => {
			const {letter, color} = cell;
			if (letter && color !== 'white') {
				if (
					!letterColors[letter] ||
					(letterColors[letter] !== 'green' && color === 'green')
				) {
					letterColors[letter] = color;
				}
			}
		});
	});

	return letterColors;
};
