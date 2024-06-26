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
	const inputs = useRef<Array<Array<React.RefObject<any>>>>(
		Array(6)
			.fill(null)
			.map(() =>
				Array(5)
					.fill(null)
					.map(() => React.createRef()),
			),
	);

	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const hiveId = useSelector((state: RootState) => state.hive?.id);


	useEffect(() => {
		fetchSolution(setSolution);

		if (userId) {
			fetchUserGuesses(
				new Date().toISOString().split('T')[0],
				userId,
				hiveId
			).then(({combinedData, currentUserHasGuessed}) => {
				if (currentUserHasGuessed) {
					const formattedGuesses =
						combinedData.find(guess => guess.user_id === userId)
							?.guess || [];
					setGuesses(formattedGuesses);
					setCurrentRow(
						formattedGuesses.filter((row: any) => row.length > 0)
							.length,
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
				}
			});
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
