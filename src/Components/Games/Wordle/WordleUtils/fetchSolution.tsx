import axios from 'axios';

export const fetchSolution = async (
	setSolution: (solution: string) => void,
) => {
	try {
		const today = new Date();
		const localeDateString = today.toLocaleDateString('en-CA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			timeZone: 'America/New_York', // replace 'your-timezone-here' with the desired timezone, e.g., 'America/New_York'
		});
		const [year, month, day] = localeDateString.split('-');
		const dateString = `${year}-${month}-${day}`;

		console.log('dateString', dateString);
		const response = await axios.get(
			`https://www.nytimes.com/svc/wordle/v2/${dateString}.json`,
		);
		setSolution(response.data.solution);
	} catch (error) {
		console.error('Error fetching the solution:', error);
	}
};
