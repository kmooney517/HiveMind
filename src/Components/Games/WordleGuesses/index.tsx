import React, {useState, useEffect} from 'react';
import {ScrollView, ActivityIndicator} from 'react-native';
import {fetchUserGuesses} from '@wordle/WordleUtils/fetchUserGuesses';
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

import {useSelector} from 'react-redux';
import {RootState} from '@redux/store';

interface UserGuess {
	user_id: string;
	guess: {letter: string; color: string}[][];
	name: string;
	guessesTaken: number;
}

const WordleGuesses: React.FC = () => {
	const [date, setDate] = useState<string>(
		new Date().toISOString().split('T')[0],
	);
	const [guesses, setGuesses] = useState<UserGuess[]>([]);
	const [currentUserHasGuessed, setCurrentUserHasGuessed] =
		useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const currentUser = useSelector((state: RootState) => state.auth.user?.id);
	const hive = useSelector((state: RootState) => state.hive);

	const loadGuesses = async (selectedDate: string) => {
		setLoading(true);
		const {combinedData, todayCompleted} = await fetchUserGuesses(
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

	// Group users by the number of guesses taken
	const groupedByGuesses = guesses.reduce((acc, userGuess) => {
		const {guessesTaken} = userGuess;
		if (!acc[guessesTaken]) {
			acc[guessesTaken] = [];
		}
		acc[guessesTaken].push(userGuess);
		return acc;
	}, {} as {[key: number]: UserGuess[]});

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
					{Object.keys(groupedByGuesses)
						.sort((a, b) => Number(b) - Number(a))
						.map(key => (
							<GuessGroup key={key}>
								<GroupTitle>{key} Guesses</GroupTitle>
								<UserGrids>
									{groupedByGuesses[Number(key)].map(
										userGuess => (
											<GridWrapper
												key={userGuess.user_id}>
												<UserText>
													{userGuess.name}
												</UserText>
												<Grid
													guesses={userGuess.guess}
													email={userGuess.email}
												/>
											</GridWrapper>
										),
									)}
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
