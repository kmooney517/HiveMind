import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import styled from 'styled-components/native';
import {getSupabaseClient} from '@supabaseClient';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/store';

const JoinHive: React.FC = () => {
	const [hiveName, setHiveName] = useState<string>('');
	const [userId, setUserId] = useState<string | null>(null);
	const user = useSelector((state: RootState) => state.auth.user);
	const supabase = getSupabaseClient();

	useEffect(() => {
		setUserId(user?.id || null);
	}, [user]);

	const handleJoinHive = async () => {
		if (!hiveName || !userId) {
			Alert.alert('Please enter a hive name.');
			return;
		}

		try {
			// Check if the hive already exists
			const {data: hiveData, error: hiveError} = await supabase
				.from('hives')
				.select('id')
				.eq('name', hiveName);

			if (hiveError) {
				throw hiveError;
			}

			let hiveId = hiveData[0]?.id;

			if (!hiveId) {
				// Create a new hive if it doesn't exist
				const {data: newHiveData, error: newHiveError} = await supabase
					.from('hives')
					.insert([{name: hiveName}])
					.select('id');

				if (newHiveError) {
					throw newHiveError;
				}

				hiveId = newHiveData[0]?.id;
			}

			// Join the hive
			const {error: membershipError} = await supabase
				.from('hive_memberships')
				.insert([{user_id: userId, hive_id: hiveId}]);

			if (membershipError) {
				throw membershipError;
			}

			Alert.alert('Successfully joined the hive!');
		} catch (error) {
			console.error('Error joining hive:', error.message || error);
			Alert.alert('Error joining hive. Please try again.');
		}
	};

	return (
		<Container>
			<Input
				placeholder="Enter Hive Name"
				value={hiveName}
				onChangeText={setHiveName}
			/>
			<JoinButton title="Join or Create Hive" onPress={handleJoinHive} />
		</Container>
	);
};

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 16px;
`;

const Input = styled.TextInput`
	width: 100%;
	padding: 12px;
	margin-bottom: 16px;
	border-width: 1px;
	border-color: #ccc;
	border-radius: 4px;
`;

const JoinButton = styled(Button)`
	margin-top: 12px;
`;

export default JoinHive;
