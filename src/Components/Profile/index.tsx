import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@redux/store';
import {
	getProfile,
	handleSaveProfile,
	handleClearProfile,
} from './profileHelpers';
import {
	Container,
	Title,
	Input,
	ButtonRow,
	SaveButton,
	CancelButton,
	ProfileText,
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
			<Input
				placeholder="Enter Name"
				value={name}
				onChangeText={setName}
			/>
			<ButtonRow>
				<SaveButton
					title="Save Profile"
					onPress={() =>
						handleSaveProfile(userId, name, dispatch, navigation)
					}
				/>
				<CancelButton
					title="Cancel"
					onPress={() =>
						handleClearProfile(initialName, setName, navigation)
					}
				/>
			</ButtonRow>
			{profile.id && <ProfileText>Name: {profile.name}</ProfileText>}
		</Container>
	);
};

export default Profile;
