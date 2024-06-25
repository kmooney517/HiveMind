// src/Games/HomeScreen.tsx
import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserGuesses} from '@wordle/WordleUtils/fetchUserGuesses';
import {
	Container,
	Header,
	WelcomeText,
	ButtonRow,
	Button,
	ButtonText,
	LogoutButton,
} from './StyledHome';
import {signOut} from '@redux/authSlice';
import {RootState} from '@redux/store';

const HomeScreen = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const hive = useSelector((state: RootState) => state.hive);
	const [currentUserHasGuessed, setCurrentUserHasGuessed] =
		useState<boolean>(false);
	const [todayCompleted, setTodayCompleted] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const loadGuesses = useCallback(async () => {
		setLoading(true);
		const {currentUserHasGuessed, todayCompleted} = await fetchUserGuesses(
			new Date().toISOString().split('T')[0],
			user?.id,
		);
		setCurrentUserHasGuessed(currentUserHasGuessed);
		setTodayCompleted(todayCompleted);
		setLoading(false);
	}, [user?.id]);

	useFocusEffect(
		useCallback(() => {
			loadGuesses();
		}, [loadGuesses]),
	);

	const handleSignOut = () => {
		dispatch(signOut());
	};

	return (
		<Container>
			<Header>
				<WelcomeText>Welcome, {user?.email}!</WelcomeText>
				<LogoutButton onPress={handleSignOut} bgColor="#f44336">
					<ButtonText color="#fff">Log Out</ButtonText>
				</LogoutButton>
			</Header>
			<ButtonRow>
				<Button
					onPress={() => navigation.navigate('JoinHive')}
					bgColor="#000">
					<ButtonText color="#ffcc00">
						{hive.id ? 'View Hive Details' : 'Join or Create Hive'}
					</ButtonText>
				</Button>
				<Button
					onPress={() => navigation.navigate('Wordle')}
					disabled={!hive.id}
					bgColor={hive.id ? '#ffcc00' : '#B0C4DE'}>
					<ButtonText color={hive.id ? '#000' : '#fff'}>
						Play Wordle
					</ButtonText>
				</Button>
				<Button
					onPress={() => navigation.navigate('WordleGuesses')}
					disabled={!hive.id || !todayCompleted}
					bgColor={hive.id && todayCompleted ? '#ffcc00' : '#B0C4DE'}>
					<ButtonText
						color={hive.id && todayCompleted ? '#000' : '#fff'}>
						View Today’s Scores
					</ButtonText>
				</Button>
			</ButtonRow>
		</Container>
	);
};

export default HomeScreen;
