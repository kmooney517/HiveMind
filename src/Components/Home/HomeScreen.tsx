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
} from './StyledHome';
import {performSignOut} from '@redux/authSlice'; // Import the performSignOut function
import {RootState} from '@redux/store';

const HomeScreen = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const hive = useSelector((state: RootState) => state.hive);
	const profile = useSelector((state: RootState) => state.profile);
	const [completedToday, setCompletedToday] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const loadGuesses = useCallback(async () => {
		if (user?.id && hive?.id) {
			const {todayCompleted} = await fetchUserGuesses(
				new Date().toISOString().split('T')[0],
				user?.id,
				hive?.id,
			);

			console.log('TODSAY COMPLTED', todayCompleted);
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
				setLoading(false);
			});
		}
	}, [user?.id, dispatch]);

	const handleSignOut = () => {
		dispatch(performSignOut()); // Use performSignOut to handle the sign-out process
	};

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
		<Container>
			<Header>
				<WelcomeText>Welcome, {user?.email}!</WelcomeText>
				<Button onPress={handleSignOut}>
					<ButtonText>Log Out</ButtonText>
				</Button>
			</Header>
			<ButtonRow>
				<Button onPress={() => navigation.navigate('Profile')}>
					<ButtonText>Create/View Profile</ButtonText>
				</Button>
				<Button
					onPress={() => navigation.navigate('HiveView')}
					disabled={!profile.id}>
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
		</Container>
	);
};

export default HomeScreen;
