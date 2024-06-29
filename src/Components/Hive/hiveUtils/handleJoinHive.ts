// src/hive/handleJoinHive.ts
import {getSupabaseClient} from '@supabaseClient';

import {setHive} from '@redux/hiveSlice';
import {Dispatch} from 'redux';
import {fetchMembers} from './fetchMembers';
import {Alert} from 'react-native';

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
		const supabase = getSupabaseClient();
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
