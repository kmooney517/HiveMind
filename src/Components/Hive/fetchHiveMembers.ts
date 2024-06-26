import {getSupabaseClient} from '@supabaseClient';

export const fetchHiveMembers = async hiveId => {
	const supabase = getSupabaseClient();
	try {
		const {data, error} = await supabase
			.from('hive_memberships')
			.select('user_id, profiles!inner(name)')
			.eq('hive_id', hiveId);

		if (error) {
			console.error('Error fetching hive members:', error.message);
			throw new Error(error.message);
		}

		if (data.length === 0) {
			console.log('No hive members found for hiveId:', hiveId);
			return [];
		}

		return data.map(member => ({
			user_id: member.user_id,
			name: member.profiles.name,
		}));
	} catch (error) {
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
