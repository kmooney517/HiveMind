import {getSupabaseClient} from '@supabaseClient';
import {Alert} from 'react-native';

export const fetchHiveMembers = async (
	hiveId: string,
	setHiveMembers: (members: any[]) => void,
	updateStarterWordState: (
		starterWord: string | null,
		date: string | null,
	) => void,
) => {
	const supabase = getSupabaseClient();
	try {
		const members = await fetchMembers(hiveId);
		const today = new Date().toLocaleDateString('en-CA');

		const membersWithStatus = await Promise.all(
			members.map(async member => {
				const {data: guessData} = await supabase
					.from('user_guesses')
					.select('guess')
					.eq('user_id', member.user_id)
					.eq('date', today)
					.single();

				let completedToday = false;
				if (guessData) {
					const lastGuess =
						guessData.guess[guessData.guess.length - 1];
					completedToday =
						lastGuess &&
						lastGuess.every(cell => cell.color === 'green');
				}

				return {
					...member,
					completedToday,
					guessData: guessData ? guessData.guess : [],
					guessesTaken: guessData ? guessData.guess.length : 0,
				};
			}),
		);

		const {data: starterWordData, error: starterWordError} = await supabase
			.from('starter_words')
			.select('starter_word, date')
			.eq('hive_id', hiveId)
			.single();

		if (starterWordError) {
			console.error('Error fetching starter word:', starterWordError);
			throw starterWordError;
		}

		updateStarterWordState(
			starterWordData?.starter_word || null,
			starterWordData?.date || null,
		);

		setHiveMembers(membersWithStatus);
	} catch (error: any) {
		console.error('Error fetching hive members:', error.message || error);
		Alert.alert('Error fetching hive members. Please try again.');
	}
};

const fetchMembers = async hiveId => {
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
