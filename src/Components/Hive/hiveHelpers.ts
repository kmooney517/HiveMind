import {getSupabaseClient} from '@supabaseClient';
import {setHive, clearHive} from '@redux/hiveSlice';
import {fetchHiveMembers} from './fetchHiveMembers';
import {Dispatch} from 'redux';
import {Alert} from 'react-native';

const supabase = getSupabaseClient();

export const fetchMembers = async (
	hiveId: string,
	setHiveMembers: (members: any[]) => void,
) => {
	try {
		const members = await fetchHiveMembers(hiveId);
		setHiveMembers(members);
	} catch (error: any) {
		console.error('Error fetching hive members:', error.message || error);
		Alert.alert('Error fetching hive members. Please try again.');
	}
};

export const handleJoinHive = async (
	hiveName: string,
	userId: string,
	dispatch: Dispatch,
	setHiveMembers: (members: any[]) => void,
	setHiveName: (name: string) => void,
) => {
	if (!hiveName || !userId) {
		Alert.alert('Please enter a hive name.');
		return;
	}

	try {
		// Check if the hive already exists
		const {data: hiveData, error: hiveError} = await supabase
			.from('hives')
			.select('id, name')
			.eq('name', hiveName);

		if (hiveError) {
			throw hiveError;
		}

		let hiveIdToUse = hiveData[0]?.id;
		let hiveNameFetched = hiveData[0]?.name;

		if (!hiveIdToUse) {
			// Create a new hive if it doesn't exist
			const {data: newHiveData, error: newHiveError} = await supabase
				.from('hives')
				.insert([{name: hiveName}])
				.select('id, name')
				.single();

			if (newHiveError) {
				throw newHiveError;
			}

			hiveIdToUse = newHiveData.id;
			hiveNameFetched = newHiveData.name;
		}

		// Join the hive
		const {error: membershipError} = await supabase
			.from('hive_memberships')
			.insert([{user_id: userId, hive_id: hiveIdToUse}]);

		if (membershipError) {
			throw membershipError;
		}

		dispatch(setHive({id: hiveIdToUse, name: hiveNameFetched}));
		await fetchMembers(hiveIdToUse, setHiveMembers);
		Alert.alert('Successfully joined the hive!');
		setHiveName(hiveNameFetched);
	} catch (error: any) {
		console.error('Error joining hive:', error.message || error);
		Alert.alert('Error joining hive. Please try again.');
	}
};

export const handleLeaveHive = async (
	userId: string,
	dispatch: Dispatch,
	setHiveMembers: (members: any[]) => void,
) => {
	try {
		await leaveHive(userId);
		dispatch(clearHive());
		setHiveMembers([]);
		Alert.alert('Successfully left the hive!');
	} catch (error: any) {
		console.error('Error leaving hive:', error.message || error);
		Alert.alert('Error leaving hive. Please try again.');
	}
};
