import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/store';
import { fetchHiveMembers, leaveHive } from './fetchHiveMembers';
import { setHive, clearHive } from '@redux/hiveSlice';
import { getSupabaseClient } from '@supabaseClient';

const JoinHive: React.FC = () => {
	const [hiveName, setHiveName] = useState<string>('');
	const [hiveMembers, setHiveMembers] = useState<any[]>([]);
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const hiveId = useSelector((state: RootState) => state.hive.id);
	const hiveNameState = useSelector((state: RootState) => state.hive.name);
	const dispatch = useDispatch();

	useEffect(() => {
		if (hiveId) {
			fetchMembers(hiveId);
		}
	}, [hiveId]);

	const supabase = getSupabaseClient();

	const fetchMembers = async (hiveId: string) => {
		try {
			const members = await fetchHiveMembers(hiveId);
			setHiveMembers(members);
		} catch (error: any) {
			console.error(
				'Error fetching hive members:',
				error.message || error,
			);
			Alert.alert('Error fetching hive members. Please try again.');
		}
	};

	const handleJoinHive = async () => {
		if (!hiveName || !userId) {
			Alert.alert('Please enter a hive name.');
			return;
		}

		try {
			// Check if the hive already exists
			const { data: hiveData, error: hiveError } = await supabase
				.from('hives')
				.select('id, name')
				.eq('name', hiveName);

			if (hiveError) {
				throw hiveError;
			}

			let hiveId = hiveData[0]?.id;
			let hiveNameFetched = hiveData[0]?.name;

			if (!hiveId) {
				// Create a new hive if it doesn't exist
				const { data: newHiveData, error: newHiveError } = await supabase
					.from('hives')
					.insert([{ name: hiveName }])
					.select('id, name');

				if (newHiveError) {
					throw newHiveError;
				}

				hiveId = newHiveData[0]?.id;
				hiveNameFetched = newHiveData[0]?.name;
			}

			// Join the hive
			const { error: membershipError } = await supabase
				.from('hive_memberships')
				.insert([{ user_id: userId, hive_id: hiveId }]);

			if (membershipError) {
				throw membershipError;
			}

			dispatch(setHive({ id: hiveId, name: hiveNameFetched }));
			await fetchMembers(hiveId);
			Alert.alert('Successfully joined the hive!');
		} catch (error: any) {
			console.error('Error joining hive:', error.message || error);
			Alert.alert('Error joining hive. Please try again.');
		}
	};

	const handleLeaveHive = async () => {
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

	return (
		<Container>
			{hiveId ? (
				<ScrollView>
					<HiveMembersTitle>{`Hive Members - ${hiveNameState}`}</HiveMembersTitle>
					{hiveMembers.map(member => (
						<MemberItem key={member.user_id}>
							<MemberText>{member.user_id}</MemberText>
						</MemberItem>
					))}
					<LeaveButton title="Leave Hive" onPress={handleLeaveHive} />
				</ScrollView>
			) : (
				<>
					<Input
						placeholder="Enter Hive Name"
						value={hiveName}
						onChangeText={setHiveName}
					/>
					<JoinButton
						title="Join or Create Hive"
						onPress={handleJoinHive}
					/>
				</>
			)}
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

const LeaveButton = styled(Button)`
	margin-top: 12px;
`;

const HiveMembersTitle = styled.Text`
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 16px;
`;

const MemberItem = styled.View`
	padding: 10px;
	margin-bottom: 10px;
	border-width: 1px;
	border-color: #ccc;
	border-radius: 4px;
	width: 100%;
	align-items: center;
`;

const MemberText = styled.Text`
	font-size: 18px;
`;

export default JoinHive;