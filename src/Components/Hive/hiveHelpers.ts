import { getSupabaseClient } from '@supabaseClient';
import { setHive, clearHive } from '@redux/hiveSlice';
import { fetchHiveMembers } from './fetchHiveMembers';
import { Dispatch } from 'redux';
import { Alert } from 'react-native';

const supabase = getSupabaseClient();

const calculateAdvantage = (guess: { letter: string; color: string }[]) => {
	let greenCount = 0;
	let yellowCount = 0;
	for (const cell of guess) {
		if (cell.color === 'green') {
			greenCount++;
		} else if (cell.color === 'yellow') {
			yellowCount++;
		}
	}
	return { greenCount, yellowCount };
};

const determineWorstPlayer = (guesses: any[]) => {
	const maxGuesses = Math.max(...guesses.map(g => g.guess.length));
	const worstPlayers = guesses.filter(g => g.guess.length === maxGuesses);

	if (worstPlayers.length === 1) return worstPlayers[0];

	worstPlayers.sort((a, b) => {
		for (let i = 0; i < maxGuesses; i++) {
			const aAdvantage = calculateAdvantage(a.guess[i]);
			const bAdvantage = calculateAdvantage(b.guess[i]);

			if (aAdvantage.greenCount !== bAdvantage.greenCount) {
				return bAdvantage.greenCount - aAdvantage.greenCount;
			}
			if (aAdvantage.yellowCount !== bAdvantage.yellowCount) {
				return bAdvantage.yellowCount - aAdvantage.yellowCount;
			}
		}
		return 0;
	});

	return worstPlayers[0];
};

export const fetchMembers = async (
	hiveId: string,
	setHiveMembers: (members: any[]) => void,
) => {
	try {
		const members = await fetchHiveMembers(hiveId);

		const today = new Date().toISOString().split('T')[0];

		const { data: guessesData, error: guessesError } = await supabase
			.from('user_guesses')
			.select('user_id, guess')
			.eq('date', today)
			.in('user_id', members.map(member => member.user_id));

		if (guessesError) {
			throw guessesError;
		}

		const userGuessesMap = guessesData.reduce((acc, guess) => {
			const lastGuess = guess.guess[guess.guess.length - 1];
			const allGreen = lastGuess && lastGuess.every(cell => cell.color === 'green');
			const maxGuessesReached = guess.guess.length >= 6;
			const completedToday = allGreen || maxGuessesReached;
			acc[guess.user_id] = completedToday;
			return acc;
		}, {});

		const updatedMembers = members.map(member => ({
			...member,
			completedToday: userGuessesMap[member.user_id] || false,
		}));

		const worstPlayer = determineWorstPlayer(guessesData);

		setHiveMembers(updatedMembers.map(member => ({
			...member,
			isWorstPlayer: member.user_id === worstPlayer.user_id,
		})));
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
		const { data: hiveData, error: hiveError } = await supabase
			.from('hives')
			.select('id, name')
			.eq('name', hiveName);

		if (hiveError) {
			throw hiveError;
		}

		let hiveIdToUse = hiveData[0]?.id;
		let hiveNameFetched = hiveData[0]?.name;

		if (!hiveIdToUse) {
			const { data: newHiveData, error: newHiveError } = await supabase
				.from('hives')
				.insert([{ name: hiveName }])
				.select('id, name')
				.single();

			if (newHiveError) {
				throw newHiveError;
			}

			hiveIdToUse = newHiveData.id;
			hiveNameFetched = newHiveData.name;
		}

		const { error: membershipError } = await supabase
			.from('hive_memberships')
			.insert([{ user_id: userId, hive_id: hiveIdToUse }]);

		if (membershipError) {
			throw membershipError;
		}

		dispatch(setHive({ id: hiveIdToUse, name: hiveNameFetched }));
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