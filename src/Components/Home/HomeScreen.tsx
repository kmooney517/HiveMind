// src/Games/HomeScreen.tsx
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button as RNButton} from 'react-native';
import {fetchUserGuesses} from '@wordle/WordleUtils/fetchUserGuesses';
import {Container, Header, WelcomeText} from './StyledHome';
import styled from 'styled-components/native';
import {signOut} from '@redux/authSlice';
import {RootState} from '@redux/store';

const HomeScreen = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const hive = useSelector((state: RootState) => state.hive);
	const [currentUserHasGuessed, setCurrentUserHasGuessed] =
		useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadGuesses = async () => {
			setLoading(true);
			const {currentUserHasGuessed} = await fetchUserGuesses(
				new Date().toISOString().split('T')[0],
				user?.id,
			);
			setCurrentUserHasGuessed(currentUserHasGuessed);
			setLoading(false);
		};

		loadGuesses();
	}, [user]);

	const handleSignOut = () => {
		dispatch(signOut());
	};

	return (
		<Container>
			<Header>
				<WelcomeText>Welcome, {user?.email}!</WelcomeText>
				<RNButton title="Log Out" onPress={handleSignOut} />
			</Header>
			<ButtonRow>
				<Button onPress={() => navigation.navigate('JoinHive')}>
					<ButtonText>
						{hive.id ? 'View Hive Details' : 'Join or Create Hive'}
					</ButtonText>
				</Button>
				<Button
					onPress={() => navigation.navigate('Wordle')}
					disabled={!hive.id}
					style={{backgroundColor: hive.id ? '#007AFF' : '#B0C4DE'}}>
					<ButtonText>Play Wordle</ButtonText>
				</Button>
				<Button
					onPress={() => navigation.navigate('WordleGuesses')}
					disabled={!hive.id || !currentUserHasGuessed}
					style={{
						backgroundColor:
							hive.id && currentUserHasGuessed
								? '#007AFF'
								: '#B0C4DE',
					}}>
					<ButtonText>View Today’s Scores</ButtonText>
				</Button>
			</ButtonRow>
		</Container>
	);
};

const ButtonRow = styled.View`
	flex-direction: row;
	justify-content: space-around;
	width: 100%;
	padding: 16px;
`;

const Button = styled.TouchableOpacity`
	background-color: #007aff;
	padding: 20px;
	margin: 5px;
	border-radius: 10px;
	align-items: center;
	flex: 1;
`;

const ButtonText = styled.Text`
	color: #ffffff;
	font-size: 16px;
	font-weight: bold;
`;

export default HomeScreen;
