import {getSupabaseClient} from '@supabaseClient';

export const fetchHiveMembers = async (hiveId: string) => {
	const supabase = getSupabaseClient();
	const {data, error} = await supabase
		.from('hive_memberships')
		.select(
			`
      user_id,
      profiles (
        email
      )
    `,
		)
		.eq('hive_id', hiveId);

	if (error) {
		throw new Error(error.message);
	}

	return data;
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
