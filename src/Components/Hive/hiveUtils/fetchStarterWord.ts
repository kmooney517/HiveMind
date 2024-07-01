import {getSupabaseClient} from '@supabaseClient';

const supabase = getSupabaseClient();

export const fetchStarterWord = async (hiveId: string, date: string) => {
	const {data, error} = await supabase
		.from('starter_words')
		.select('starter_word')
		.eq('hive_id', hiveId)
		.eq('date', date)
		.single();

	if (error) {
		throw error;
	}

	return data?.starter_word || null;
};
