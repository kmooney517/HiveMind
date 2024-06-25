const calculateScore = (
	guesses: {letter: string; color: string}[][],
): number => {
	const maxPoints = 600;
	const yellowPenalty = 10;
	const grayPenalty = 20;
	let score = maxPoints;

	guesses.forEach(guess => {
		guess.forEach(cell => {
			if (cell.color === 'yellow') {
				score -= yellowPenalty;
			} else if (cell.color === 'gray') {
				score -= grayPenalty;
			}
		});
	});

	return Math.max(score, 0);
};

const calculateAdvantage = (
	guesses: {letter: string; color: string}[][],
): number => {
	let advantage = 0;
	for (let i = 1; i < guesses.length; i++) {
		// Start from the second guess
		const guess = guesses[i];
		let greens = 0;
		let yellows = 0;
		guess.forEach(cell => {
			if (cell.color === 'green') {
				greens += 1;
			} else if (cell.color === 'yellow') {
				yellows += 1;
			}
		});
		advantage += greens * 2 + yellows; // Greens have more weight
	}
	return advantage;
};

export {calculateScore, calculateAdvantage};
