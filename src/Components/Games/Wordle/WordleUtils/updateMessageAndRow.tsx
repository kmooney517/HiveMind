export const updateMessageAndRow = (
	guess: string,
	solution: string,
	currentRow: number,
	setMessage: React.Dispatch<React.SetStateAction<string>>,
	setCurrentRow: React.Dispatch<React.SetStateAction<number>>,
) => {
	if (guess === solution.toLowerCase()) {
		setMessage('Correct!');
	} else {
		setMessage('Try again.');
		if (currentRow < 5) {
			setCurrentRow(currentRow + 1);
		}
	}
};
