import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@redux/store';
import {
	getProfile,
	handleSaveProfile,
	handleClearProfile,
} from './profileHelpers';
import {Alert} from 'react-native';
import {
	Container,
	Title,
	Label,
	Input,
	ButtonRow,
	StyledButton,
	ButtonText,
	CancelButton,
} from './StyledProfile';

const Profile = ({navigation}) => {
	const [name, setName] = useState<string>('');
	const [initialName, setInitialName] = useState<string>('');
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const profile = useSelector((state: RootState) => state.profile);
	const dispatch = useDispatch();

	useEffect(() => {
		if (userId) {
			getProfile(userId, dispatch);
		}
	}, [userId, dispatch]);

	useEffect(() => {
		if (profile.name) {
			setName(profile.name);
			setInitialName(profile.name);
		}
	}, [profile]);

	return (
		<Container>
			<Title>{profile.id ? 'Update Profile' : 'Create Profile'}</Title>
			<Label>Name</Label>
			<Input
				placeholder="Enter Name"
				value={name}
				onChangeText={setName}
			/>
			<ButtonRow>
				<StyledButton
					onPress={() => {
						if (profile.name === '' && name === '') {
							Alert.alert('You need a name!');
						} else {
							handleSaveProfile(
								userId,
								name,
								dispatch,
								navigation,
							);
						}
					}}
					bgColor="#4b9ce2">
					<ButtonText>Save Profile</ButtonText>
				</StyledButton>
				<CancelButton
					title="Cancel"
					onPress={() => {
						if (profile.name) {
							handleClearProfile(
								initialName,
								setName,
								navigation,
							);
						}
					}}
				/>
			</ButtonRow>
		</Container>
	);
};

export default Profile;
