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
	PlayButton,
	ViewScoresButton,
} from './StyledHome';
import ProfileModal from '../Profile';
import {performSignOut} from '@redux/authSlice'; // Import the performSignOut function
import {RootState} from '@redux/store';

const HomeScreen = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const hive = useSelector((state: RootState) => state.hive);
	const [completedToday, setCompletedToday] = useState<boolean>(false);
	const [profileModalVisible, setProfileModalVisible] =
		useState<boolean>(false);

	const loadGuesses = useCallback(async () => {
		const {todayCompleted} = await fetchUserGuesses(
			new Date().toISOString().split('T')[0],
			user?.id,
			hive?.id,
		);
		setCompletedToday(todayCompleted);
	}, [user?.id, hive?.id]);

	useFocusEffect(
		useCallback(() => {
			loadGuesses();
		}, [loadGuesses]),
	);

	const handleSignOut = () => {
		dispatch(performSignOut()); // Use performSignOut to handle the sign-out process
	};

	return (
		<Container>
			<Header>
				<WelcomeText>Welcome, {user?.email}!</WelcomeText>
				<Button onPress={handleSignOut}>
					<ButtonText>Log Out</ButtonText>
				</Button>
			</Header>
			<ButtonRow>
				<Button onPress={() => setProfileModalVisible(true)}>
					<ButtonText>Create/View Profile</ButtonText>
				</Button>
				<Button onPress={() => navigation.navigate('JoinHive')}>
					<ButtonText>
						{hive.id ? 'View Hive Details' : 'Join or Create Hive'}
					</ButtonText>
				</Button>
				<PlayButton
					onPress={() => navigation.navigate('Wordle')}
					disabled={!hive.id}>
					<ButtonText>Play Wordle</ButtonText>
				</PlayButton>
				<ViewScoresButton
					onPress={() => navigation.navigate('WordleGuesses')}
					disabled={!hive.id || !completedToday}>
					<ButtonText>View Today’s Scores</ButtonText>
				</ViewScoresButton>
			</ButtonRow>
			<ProfileModal
				isVisible={profileModalVisible}
				onClose={() => setProfileModalVisible(false)}
			/>
		</Container>
	);
};

export default HomeScreen;
