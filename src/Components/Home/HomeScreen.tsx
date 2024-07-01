// src/Games/HomeScreen.tsx
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '@profile/profileHelpers';
import {
	Container,
	Header,
	WelcomeText,
	Button,
	ButtonText,
	PlayButton,
	SafeAreaViewContainer,
} from './StyledHome';
import {RootState} from '@redux/store';
import TopNavbar from '../TopNavbar';

const HomeScreen = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const hive = useSelector((state: RootState) => state.hive);
	const profile = useSelector((state: RootState) => state.profile);
	const [loading, setLoading] = useState<boolean>(true);
	const [profileFetched, setProfileFetched] = useState<boolean>(false);

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
				<PlayButton
					onPress={() => navigation.navigate('Wordle')}
					disabled={!hive.id}
					backgroundColor={!hive.id ? '#B0C4DE' : '#007AFF'}>
					<ButtonText>Play Wordle</ButtonText>
				</PlayButton>
				<Button
					onPress={() => navigation.navigate('HiveView')}
					disabled={!profile.id}
					backgroundColor={!profile.id ? '#B0C4DE' : '#007AFF'}>
					<ButtonText>
						{hive.id ? hive.name : 'Join/Create Hive'}
					</ButtonText>
				</Button>
			</Container>
		</SafeAreaViewContainer>
	);
};

export default HomeScreen;
