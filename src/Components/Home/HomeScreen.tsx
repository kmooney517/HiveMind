// src/Games/HomeScreen.tsx

import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserGuesses } from '@wordle/WordleUtils/fetchUserGuesses';
import { Container, Header, WelcomeText, ButtonRow, Button, ButtonText } from './StyledHome';
import ProfileModal from '../Profile';
import { performSignOut } from '@redux/authSlice'; // Import the performSignOut function
import { RootState } from '@redux/store';

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const hive = useSelector((state: RootState) => state.hive);
	const [currentUserHasGuessed, setCurrentUserHasGuessed] = useState<boolean>(false);
	const [todayCompleted, setTodayCompleted] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);

	const loadGuesses = useCallback(async () => {
		setLoading(true);
		const { currentUserHasGuessed, todayCompleted } = await fetchUserGuesses(
			new Date().toISOString().split('T')[0],
			user?.id,
			hive?.id
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
		dispatch(performSignOut()); // Use performSignOut to handle the sign-out process
	};

	return (
		<Container>
			<Header>
				<WelcomeText>Welcome, {user?.email}!</WelcomeText>
				<Button onPress={handleSignOut}><ButtonText>Log Out</ButtonText></Button>
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
				<Button
					onPress={() => navigation.navigate('Wordle')}
					disabled={!hive.id}
					style={{ backgroundColor: hive.id ? '#007AFF' : '#B0C4DE' }}>
					<ButtonText>Play Wordle</ButtonText>
				</Button>
				<Button
					onPress={() => navigation.navigate('WordleGuesses')}
					disabled={!hive.id || !todayCompleted}
					style={{
						backgroundColor:
							hive.id && todayCompleted ? '#007AFF' : '#B0C4DE',
					}}>
					<ButtonText>View Today’s Scores</ButtonText>
				</Button>
			</ButtonRow>
			<ProfileModal
				isVisible={profileModalVisible}
				onClose={() => setProfileModalVisible(false)}
			/>
		</Container>
	);
};

export default HomeScreen;