import React, {useState, useEffect} from 'react';
import {Text, ScrollView, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {fetchUserGuesses} from '@wordle/WordleUtils/fetchUserGuesses';
import {RootState} from '@redux/store';
import {
	Container,
	DateInput,
	MessageText,
	BackButton,
} from './StyledWordleGuesses';
import UserList from './UserList';
import GuessGroupList from './GuessGroupList';
import {UserGuess} from '@types';

import {determineWorstPlayer} from './guessUtils';

const WordleGuesses: React.FC = ({navigation}) => {
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

	const worstPlayer = determineWorstPlayer(guesses);

	const notCompletedUsers = guesses
		.filter(guess => !guess.completedToday)
		.map(guess => guess.name);

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
			<BackButton onPress={() => navigation.navigate('Home')}>
				<Text>← Home</Text>
			</BackButton>
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
						<UserList
							title="Users who have not completed today's Wordle"
							users={notCompletedUsers}
						/>
					)}
					<GuessGroupList
						groupedByGuesses={groupedByGuesses}
						worstPlayer={worstPlayer}
					/>
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
