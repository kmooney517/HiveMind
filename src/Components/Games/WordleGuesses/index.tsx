import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { fetchUserGuesses } from '@wordle/WordleUtils/fetchUserGuesses';
import Grid from './Grid';
import {
	Container,
	DateInput,
	GuessGroup,
	GroupTitle,
	UserGrids,
	GridWrapper,
	UserText,
	MessageText,
} from './StyledWordleGuesses';

import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

interface UserGuess {
	user_id: string;
	guess: { letter: string; color: string }[][];
	name: string;
	guessesTaken: number;
	completedToday: boolean;
}

// Helper function to determine advantage
const calculateAdvantage = (guess: { letter: string; color: string }[]) => {
	let greenCount = 0;
	let yellowCount = 0;
	for (const cell of guess) {
		if (cell.color === 'green') {
			greenCount++;
		} else if (cell.color === 'yellow') {
			yellowCount++;
		}
	}
	return { greenCount, yellowCount };
};

// Function to determine the worst player
const determineWorstPlayer = (guesses: UserGuess[]) => {
	const maxGuesses = Math.max(...guesses.map(g => g.guessesTaken));
	const worstPlayers = guesses.filter(g => g.guessesTaken === maxGuesses);

	if (worstPlayers.length === 1) return worstPlayers[0];

	worstPlayers.sort((a, b) => {
		for (let i = 0; i < maxGuesses; i++) {
			const aAdvantage = calculateAdvantage(a.guess[i]);
			const bAdvantage = calculateAdvantage(b.guess[i]);

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

const WordleGuesses: React.FC = () => {
	const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
	const [guesses, setGuesses] = useState<UserGuess[]>([]);
	const [currentUserHasGuessed, setCurrentUserHasGuessed] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const currentUser = useSelector((state: RootState) => state.auth.user?.id);
	const hive = useSelector((state: RootState) => state.hive);

	const loadGuesses = async (selectedDate: string) => {
		setLoading(true);
		const { combinedData, todayCompleted } = await fetchUserGuesses(
			selectedDate,
			currentUser,
			hive.id,
		);
		setGuesses(combinedData);
		setCurrentUserHasGuessed(todayCompleted);
		setLoading(false);
	};

	useEffect(() => {
		if (hive.id) {
			loadGuesses(date);
		} else {
			setLoading(false);
		}
	}, [date, hive.id]);

	const worstPlayer = determineWorstPlayer(guesses);

	const notCompletedUsers = guesses
		.filter(guess => !guess.completedToday)
		.map(guess => guess.name);

	console.log('guess', guesses)

	const groupedByGuesses = guesses.reduce((acc, userGuess) => {
		const { guessesTaken } = userGuess;
		if (!acc[guessesTaken]) {
			acc[guessesTaken] = [];
		}
		acc[guessesTaken].push(userGuess);
		return acc;
	}, {} as { [key: number]: UserGuess[] });

	return (
		<Container>
			<DateInput
				placeholder="YYYY-MM-DD"
				value={date}
				onChangeText={text => setDate(text)}
			/>
			{loading ? (
				<ActivityIndicator size="large" color="#ffcc00" />
			) : currentUserHasGuessed ? (
				<ScrollView>
					{notCompletedUsers.length > 0 && (
						<View>
							<GroupTitle>Users who have not completed today's Wordle</GroupTitle>
							{notCompletedUsers.map((user, index) => (
								<UserText key={index}>{user}</UserText>
							))}
						</View>
					)}
					{Object.keys(groupedByGuesses)
						.sort((a, b) => Number(b) - Number(a))
						.map(key => (
							<GuessGroup key={key}>
								<GroupTitle>{key} Guesses</GroupTitle>
								<UserGrids>
									{groupedByGuesses[Number(key)].map(userGuess => (
										<GridWrapper
											key={userGuess.user_id}
											style={userGuess.user_id === worstPlayer.user_id ? { borderColor: 'red', borderWidth: 2 } : {}}
										>
											<UserText>{userGuess.name}</UserText>
											<Grid
												guesses={userGuess.guess}
												email={userGuess.email}
											/>
										</GridWrapper>
									))}
								</UserGrids>
							</GuessGroup>
						))}
				</ScrollView>
			) : (
				<MessageText>
					You need to submit a guess to view today's guesses.
				</MessageText>
			)}
		</Container>
	);
};

export default WordleGuesses;