import {supabase} from '@supabaseClient';

export const fetchDataFromSupabase = async (userId: string) => {
	const {data, error} = await supabase
		.from('user_guesses')
		.select('*')
		.eq('user_id', userId)
		.eq('date', new Date().toISOString().split('T')[0])
		.order('created_at', {ascending: true});

	if (error) {
		throw error;
	}

	return data;
};
