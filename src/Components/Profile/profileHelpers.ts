import {getSupabaseClient} from '@supabaseClient';
import {setProfile, clearProfile} from '@redux/profileSlice';
import {Alert} from 'react-native';
import {Dispatch} from 'redux';

const supabase = getSupabaseClient();

export const getProfile = async (userId, dispatch) => {
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
		}
	} catch (error) {
		console.error('Error fetching profile:', error.message);
		dispatch(clearProfile());
	}
};

export const createOrUpdateProfile = async (
	id: string,
	profileName: string,
	dispatch: Dispatch,
) => {
	try {
		const {data, error} = await supabase
			.from('profiles')
			.upsert({user_id: id, name: profileName}, {onConflict: ['user_id']})
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

export const handleSaveProfile = async (
	userId: string,
	name: string,
	dispatch: Dispatch,
	navigation: any,
) => {
	try {
		await createOrUpdateProfile(userId, name, dispatch);
		Alert.alert('Profile saved successfully!');
		navigation.navigate('Home');
	} catch (error) {
		Alert.alert('Error saving profile:', error.message || error);
	}
};

export const handleClearProfile = (
	initialName: string,
	setName: (name: string) => void,
	navigation: any,
) => {
	setName(initialName); // Reset the name to the initial value
	navigation.navigate('Home');
};
