export const formatGuesses = (userGuesses: any) => {
	return userGuesses.map((row: any) => {
		if (Array.isArray(row)) {
			return row.map((cell: any) => ({
				letter: cell.letter || '',
				color: cell.color || 'white',
			}));
		} else {
			return Array(5).fill({letter: '', color: 'white'});
		}
	});
};
