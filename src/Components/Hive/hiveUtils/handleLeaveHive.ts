import {Alert} from 'react-native';

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

const leaveHive = async (userId: string) => {
	try {
		const {error} = await supabase
			.from('hive_memberships')
			.delete()
			.eq('user_id', userId);

		if (error) {
			throw error;
		}
	} catch (error: any) {
		console.error('Error leaving hive:', error.message || error);
		throw error;
	}
};
