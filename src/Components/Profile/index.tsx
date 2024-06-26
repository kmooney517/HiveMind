import React, {useState, useEffect} from 'react';
import {Modal, TextInput, Button, Alert, Text} from 'react-native';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {getSupabaseClient} from '@supabaseClient';
import {RootState} from '@redux/store';
import {setProfile, clearProfile} from '@redux/profileSlice';

const ProfileModal: React.FC<{isVisible: boolean; onClose: () => void}> = ({
	isVisible,
	onClose,
}) => {
	const [name, setName] = useState<string>('');
	const [initialName, setInitialName] = useState<string>('');
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const profile = useSelector((state: RootState) => state.profile);
	const dispatch = useDispatch();
	const supabase = getSupabaseClient();

	useEffect(() => {
		if (userId) {
			getProfile(userId);
		}
	}, [userId]);

	useEffect(() => {
		if (profile.name) {
			setName(profile.name);
			setInitialName(profile.name);
		}
	}, [profile]);

	const getProfile = async (userId: string) => {
		try {
			const {data, error} = await supabase
				.from('profiles')
				.select('*')
				.eq('user_id', userId)
				.single();

			if (error && error.code !== 'PGRST116') {
				throw new Error(error.message);
			}

			if (data) {
				dispatch(setProfile(data));
			} else {
				dispatch(clearProfile());
				setName('');
				setInitialName('');
			}
		} catch (error) {
			console.error('Error fetching profile:', error.message);
		}
	};

	const handleSaveProfile = async () => {
		try {
			await createOrUpdateProfile(userId, name);
			Alert.alert('Profile saved successfully!');
			onClose();
		} catch (error) {
			Alert.alert('Error saving profile:', error.message || error);
		}
	};

	const createOrUpdateProfile = async (userId: string, name: string) => {
		try {
			const {data, error} = await supabase
				.from('profiles')
				.upsert({user_id: userId, name}, {onConflict: ['user_id']})
				.select('*')
				.single();

			if (error) {
				throw new Error(error.message);
			}

			if (data) {
				dispatch(setProfile(data));
			} else {
				throw new Error('Profile data is null');
			}
		} catch (error) {
			console.error('Error creating or updating profile:', error.message);
			throw error;
		}
	};

	const handleClearProfile = () => {
		setName(initialName); // Reset the name to the initial value
		onClose();
	};

	return (
		<Modal visible={isVisible} animationType="slide">
			<Container>
				<Title>
					{profile.id ? 'Update Profile' : 'Create Profile'}
				</Title>
				<Input
					placeholder="Enter Name"
					value={name}
					onChangeText={setName}
				/>
				<ButtonRow>
					<SaveButton
						title="Save Profile"
						onPress={handleSaveProfile}
					/>
					<CancelButton title="Cancel" onPress={handleClearProfile} />
				</ButtonRow>
				{profile.id && <ProfileText>Name: {profile.name}</ProfileText>}
			</Container>
		</Modal>
	);
};

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 16px;
	background-color: #f0f0f0;
`;

const Title = styled.Text`
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 16px;
`;

const Input = styled.TextInput`
	width: 100%;
	padding: 12px;
	margin-bottom: 16px;
	border-width: 1px;
	border-color: #ccc;
	border-radius: 4px;
`;

const ButtonRow = styled.View`
	flex-direction: row;
	justify-content: space-around;
	width: 100%;
`;

const SaveButton = styled(Button)`
	margin-top: 12px;
`;

const CancelButton = styled(Button)`
	margin-top: 12px;
`;

const ProfileText = styled.Text`
	font-size: 18px;
	margin-top: 16px;
`;

export default ProfileModal;
