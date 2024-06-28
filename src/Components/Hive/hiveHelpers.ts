import {getSupabaseClient} from '@supabaseClient';
import {setHive, clearHive} from '@redux/hiveSlice';
import {fetchHiveMembers} from './fetchHiveMembers';
import {Dispatch} from 'redux';
import {Alert} from 'react-native';

const supabase = getSupabaseClient();

export const fetchMembers = async (
	hiveId: string,
	setHiveMembers: (members: any[]) => void,
) => {
	try {
		const members = await fetchHiveMembers(hiveId);
		const today = new Date().toISOString().split('T')[0];

		// Check if each member has completed today's game
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
				};
			}),
		);

		setHiveMembers(membersWithStatus);
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
		// Check if the hive already exists
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
			// Create a new hive if it doesn't exist
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

		// Join the hive
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

export const determineWorstPlayer = members => {
	const membersWhoCompleted = members.filter(member => member.completedToday);

	if (membersWhoCompleted.length === 0) {
		return null;
	}

	const maxGuesses = Math.max(
		...membersWhoCompleted.map(m => m.guessData.length),
	);
	const worstPlayers = membersWhoCompleted.filter(
		m => m.guessData.length === maxGuesses,
	);

	if (worstPlayers.length === 1) {
		return worstPlayers[0];
	}

	worstPlayers.sort((a, b) => {
		for (let i = 0; i < maxGuesses; i++) {
			const aAdvantage = calculateAdvantage(a.guessData[i]);
			const bAdvantage = calculateAdvantage(b.guessData[i]);

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

export const calculateAdvantage = guess => {
	let greenCount = 0;
	let yellowCount = 0;
	for (const cell of guess) {
		if (cell.color === 'green') {
			greenCount++;
		} else if (cell.color === 'yellow') {
			yellowCount++;
		}
	}
	return {greenCount, yellowCount};
};

// Ensure to export leaveHive if not already done
export const leaveHive = async (userId: string) => {
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
