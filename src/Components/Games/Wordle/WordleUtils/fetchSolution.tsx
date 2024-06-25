import axios from 'axios';

export const fetchSolution = async (
	setSolution: (solution: string) => void,
) => {
	try {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		const dateString = `${year}-${month}-${day}`;

		const response = await axios.get(
			`https://www.nytimes.com/svc/wordle/v2/${dateString}.json`,
		);
		setSolution(response.data.solution);
	} catch (error) {
		console.error('Error fetching the solution:', error);
	}
};
