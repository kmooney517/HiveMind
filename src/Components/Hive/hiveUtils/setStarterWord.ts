import {getSupabaseClient} from '@supabaseClient';
import {Dispatch} from 'redux';

export const setStarterWord = async (
	hiveId: string,
	date: string,
	starterWord: string,
	dispatch: Dispatch,
) => {
	console.log('HELLO?');
	const supabase = getSupabaseClient();
	try {
		const {data, error} = await supabase
			.from('starter_words')
			.upsert(
				{hive_id: hiveId, date, starter_word: starterWord},
				{onConflict: ['hive_id', 'date']},
			)
			.select();

		console.log('DATA', data);
		if (error) {
			console.error('Error setting starter word:', error);
			throw error;
		}

		dispatch({
			type: 'SET_STARTER_WORD',
			payload: {hiveId, date, starterWord},
		});

		console.log('Starter word set successfully:', data);
	} catch (error: any) {
		console.error('Error setting starter word:', error.message || error);
	}
};
