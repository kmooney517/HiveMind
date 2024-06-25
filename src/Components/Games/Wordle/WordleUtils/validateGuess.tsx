import {Alert} from 'react-native';

const checkWordValidity = async (word: string): Promise<boolean> => {
	try {
		const response = await fetch(
			`https://api.datamuse.com/words?sp=${word}&max=1`,
		);
		const data = await response.json();
		return data.length > 0 && data[0].word === word;
	} catch (error) {
		console.error('Error checking word validity:', error);
		return false;
	}
};

export const validateGuess = async (guess: string): Promise<boolean> => {
	if (guess.length < 5) {
		Alert.alert('Not enough letters');
		return false;
	}

	const isValid = await checkWordValidity(guess);
	if (!isValid) {
		Alert.alert('That word is not on the list');
		return false;
	}

	return true;
};
