import {calculateAdvantage} from './calculateAdvantage';

export const determineWorstPlayer = members => {
	const membersWhoCompleted = members.filter(member => member.completedToday);

	if (membersWhoCompleted.length === 0) {
		return null;
	}

	const maxGuesses = Math.max(
		...membersWhoCompleted.map(m => m.guessesTaken),
	);
	const worstPlayers = membersWhoCompleted.filter(
		m => m.guessesTaken === maxGuesses,
	);

	if (worstPlayers.length === 1) {
		return worstPlayers[0];
	}

	worstPlayers.sort((a, b) => {
		for (let i = 0; i < maxGuesses; i++) {
			const aAdvantage = calculateAdvantage(a.guessData[i] || []);
			const bAdvantage = calculateAdvantage(b.guessData[i] || []);

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
