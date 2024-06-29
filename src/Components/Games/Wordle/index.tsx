import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';
import WordleGrid from './WordleGrid';
import WordleKeyboard from './WordleKeyboard';
import {fetchUserGuesses, fetchSolution, handleKeyPress} from './WordleUtils';
import {RootState} from '@redux/store';

import {
	Container,
	GameContainer,
	KeyboardContainer,
	Message,
} from './StyledWordle';

const {height: screenHeight} = Dimensions.get('window');

const Wordle = (): React.JSX.Element => {
	const [solution, setSolution] = useState<string>('');
	const [guesses, setGuesses] = useState<{letter: string; color: string}[][]>(
		Array(6)
			.fill(null)
			.map(() => Array(5).fill({letter: '', color: 'white'})),
	);
	const [currentRow, setCurrentRow] = useState<number>(0);
	const [message, setMessage] = useState<string>('');
	const [letterColors, setLetterColors] = useState<{[key: string]: string}>(
		{},
	);
	const inputs = useRef(
		Array.from({length: 6}, () =>
			Array.from({length: 5}, () => React.createRef()),
		),
	);

	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const hiveId = useSelector((state: RootState) => state.hive?.id);

	useEffect(() => {
		fetchSolution(setSolution);

		if (userId) {
			const today = new Date();
			const localeDateString = today.toLocaleDateString('en-CA', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				timeZone: 'America/New_York', // Replace with appropriate timezone
			});
			fetchUserGuesses(localeDateString, userId, hiveId).then(
				({combinedData}) => {
					const userGuess = combinedData.find(
						guess => guess.user_id === userId,
					);

					const formattedGuesses = userGuess ? userGuess.guess : [];
					setGuesses(formattedGuesses);

					const nextEmptyRow = formattedGuesses.findIndex(row =>
						row.every(cell => cell.letter === ''),
					);
					setCurrentRow(
						nextEmptyRow !== -1
							? nextEmptyRow
							: formattedGuesses.length,
					);

					const _letterColors = formattedGuesses.reduce(
						(acc, row) => {
							row.forEach(({letter, color}) => {
								if (letter && color !== 'white') {
									acc[letter] = color;
								}
							});
							return acc;
						},
						{},
					);
					setLetterColors(_letterColors);

					// Check if the game is complete and set the message accordingly
					const gameCompleted =
						formattedGuesses.some(row =>
							row.every(cell => cell.color === 'green'),
						) || formattedGuesses.length === 6;
					if (gameCompleted) {
						setMessage('Game Completed!');
					}
				},
			);
		}
	}, [userId]);

	return (
		<Container>
			<GameContainer screenHeight={screenHeight}>
				<WordleGrid
					guesses={guesses}
					handleInputChange={(value, row, col) =>
						handleInputChange(
							value,
							row,
							col,
							guesses,
							setGuesses,
							inputs,
						)
					}
					inputs={inputs}
				/>
				<Message>{message}</Message>
			</GameContainer>
			<KeyboardContainer screenHeight={screenHeight}>
				<WordleKeyboard
					onKeyPress={key =>
						handleKeyPress(
							key,
							currentRow,
							guesses,
							setGuesses,
							solution,
							setLetterColors,
							setMessage,
							setCurrentRow,
							inputs,
							userId,
						)
					}
					letterColors={letterColors}
				/>
			</KeyboardContainer>
		</Container>
	);
};

export default Wordle;
