export const padGuessesArray = (formattedGuesses: any) => {
	while (formattedGuesses.length < 6) {
		formattedGuesses.push(Array(5).fill({letter: '', color: 'white'}));
	}
	return formattedGuesses;
};
