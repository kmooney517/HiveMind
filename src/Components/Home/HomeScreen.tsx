// src/Games/HomeScreen.tsx
import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserGuesses} from '@wordle/WordleUtils/fetchUserGuesses';
import {getProfile} from '@profile/profileHelpers'; // Import the profile helper function
import {
	Container,
	Header,
	WelcomeText,
	ButtonRow,
	Button,
	ButtonText,
	PlayButton,
	ViewScoresButton,
	SafeAreaViewContainer,
} from './StyledHome';
import {RootState} from '@redux/store';
import TopNavbar from '../TopNavbar';

const HomeScreen = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const hive = useSelector((state: RootState) => state.hive);
	const profile = useSelector((state: RootState) => state.profile);
	const [completedToday, setCompletedToday] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [profileFetched, setProfileFetched] = useState<boolean>(false);

	const loadGuesses = useCallback(async () => {
		if (user?.id && hive?.id) {
			const {todayCompleted} = await fetchUserGuesses(
				new Date().toISOString().split('T')[0],
				user?.id,
				hive?.id,
			);
			setCompletedToday(todayCompleted);
		}
	}, [user?.id, hive?.id]);

	useFocusEffect(
		useCallback(() => {
			loadGuesses();
		}, [loadGuesses]),
	);

	useEffect(() => {
		if (user?.id) {
			setLoading(true);
			getProfile(user.id, dispatch).then(() => {
				setProfileFetched(true);
				setLoading(false);
			});
		}
	}, [user?.id, dispatch]);

	useEffect(() => {
		if (profileFetched && !profile.name) {
			navigation.navigate('Profile', {forceRedirect: true});
		}
	}, [profile, profileFetched, navigation]);

	if (loading) {
		return (
			<Container>
				<Header>
					<WelcomeText>Loading...</WelcomeText>
				</Header>
			</Container>
		);
	}

	return (
		<SafeAreaViewContainer>
			<TopNavbar navigation={navigation} />
			<Container>
				<ButtonRow>
					<Button
						onPress={() => navigation.navigate('HiveView')}
						disabled={!profile.id}
						backgroundColor={!profile.id ? '#B0C4DE' : '#007AFF'}>
						<ButtonText>
							{hive.id ? hive.name : 'Join or Create Hive'}
						</ButtonText>
					</Button>
					<PlayButton
						onPress={() => navigation.navigate('Wordle')}
						disabled={!hive.id}
						backgroundColor={!hive.id ? '#B0C4DE' : '#007AFF'}>
						<ButtonText>Play Wordle</ButtonText>
					</PlayButton>
					<ViewScoresButton
						onPress={() => navigation.navigate('WordleGuesses')}
						disabled={!hive.id || !completedToday}
						backgroundColor={
							!hive.id || !completedToday ? '#B0C4DE' : '#007AFF'
						}>
						<ButtonText>View Today’s Scores</ButtonText>
					</ViewScoresButton>
				</ButtonRow>
			</Container>
		</SafeAreaViewContainer>
	);
};

export default HomeScreen;
