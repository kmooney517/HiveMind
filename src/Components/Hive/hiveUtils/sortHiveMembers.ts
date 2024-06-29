// src/hive/sortHiveMembers.ts
import {calculateAdvantage} from './calculateAdvantage';

export const sortHiveMembers = (hiveMembers, worstPlayer) => {
	return hiveMembers.sort((a, b) => {
		// Move the loser to the top
		if (a.user_id === worstPlayer?.user_id) {
			return -1;
		}
		if (b.user_id === worstPlayer?.user_id) {
			return 1;
		}

		// Sort users who have not completed the game
		if (!a.completedToday && b.completedToday) {
			return -1;
		}
		if (a.completedToday && !b.completedToday) {
			return 1;
		}

		// Sort by guesses taken in reverse
		if (a.guessesTaken > b.guessesTaken) {
			return -1;
		}
		if (a.guessesTaken < b.guessesTaken) {
			return 1;
		}

		for (
			let i = 0;
			i < Math.max(a.guessData.length, b.guessData.length);
			i++
		) {
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
};
