import axios from 'axios';

export const checkIfWordValid = async word => {
	try {
		const response = await axios.get(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
		);
		return response.status === 200;
	} catch (error) {
		console.error('Error validating word:', error);
		return false;
	}
};
