import {UserGuess} from '@types';

export const calculateAdvantage = (
	guess: {letter: string; color: string}[],
) => {
	let greenCount = 0;
	let yellowCount = 0;
	for (const cell of guess) {
		if (cell.color === 'green') {
			greenCount++;
		} else if (cell.color === 'yellow') {
			yellowCount++;
		}
	}
	return {greenCount, yellowCount};
};

export const determineWorstPlayer = (guesses: UserGuess[]) => {
	const maxGuesses = Math.max(...guesses.map(g => g.guessesTaken));
	const worstPlayers = guesses.filter(g => g.guessesTaken === maxGuesses);

	if (worstPlayers.length === 1) {
		return worstPlayers[0];
	}

	worstPlayers.sort((a, b) => {
		for (let i = 0; i < maxGuesses; i++) {
			const aAdvantage = calculateAdvantage(a.guess[i]);
			const bAdvantage = calculateAdvantage(b.guess[i]);

			if (aAdvantage.greenCount !== bAdvantage.greenCount) {
				return bAdvantage.greenCount - aAdvantage.greenCount;
			}
			if (aAdvantage.yellowCount !== bAdvantage.yellowCount) {
				return bAdvantage.yellowCount - aAdvantage.yellowCount;
			}
		}
		return 0;
	});

	return worstPlayers[0];
};
