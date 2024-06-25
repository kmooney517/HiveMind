import {getSupabaseClient} from '@supabaseClient';

export const fetchHiveMembers = async (hiveId: string) => {
	const supabase = getSupabaseClient();
	try {
		const {data, error} = await supabase
			.from('hive_memberships')
			.select('user_id')
			.eq('hive_id', hiveId);

		if (error) {
			console.error('Error fetching hive members:', error.message);
			throw new Error(error.message);
		}

		if (data.length === 0) {
			console.log('No hive members found for hiveId:', hiveId);
			return [];
		}

		console.log('Hive members data:', data);
		return data;
	} catch (error: any) {
		console.error('Error fetching hive members:', error.message || error);
		return [];
	}
};
export const leaveHive = async (userId: string) => {
	const supabase = getSupabaseClient();
	const {error} = await supabase
		.from('hive_memberships')
		.delete()
		.eq('user_id', userId);

	if (error) {
		throw new Error(error.message);
	}
};
