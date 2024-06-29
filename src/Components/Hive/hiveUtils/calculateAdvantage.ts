export const calculateAdvantage = guess => {
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
