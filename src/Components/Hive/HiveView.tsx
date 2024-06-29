// src/components/HiveView.tsx
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@redux/store';
import {
	fetchHiveMembers,
	handleJoinHive,
	handleLeaveHive,
	determineWorstPlayer,
	sortHiveMembers,
	getBorderColor,
} from './hiveUtils';
import {Container, Input, JoinButton} from './StyledHiveView';
import {HiveHeader} from './HiveHeader';
import HiveMemberRow from './HiveMemberRow';
import HiveMemberModal from './HiveMemberModal';

const HiveView: React.FC = ({navigation}) => {
	const [hiveName, setHiveName] = useState<string>('');
	const [hiveMembers, setHiveMembers] = useState<any[]>([]);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [selectedMember, setSelectedMember] = useState<any>(null);
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const hiveId = useSelector((state: RootState) => state.hive.id);
	const hiveNameState = useSelector((state: RootState) => state.hive.name);
	const dispatch = useDispatch();

	useEffect(() => {
		if (hiveId) {
			fetchHiveMembers(hiveId, setHiveMembers);
		}
	}, [hiveId]);

	const worstPlayer = determineWorstPlayer(hiveMembers);
	const allCompleted = hiveMembers.every(member => member.completedToday);
	const sortedMembers = sortHiveMembers(hiveMembers, worstPlayer);

	const handleMemberPress = member => {
		setSelectedMember(member);
		setModalVisible(true);
	};

	return (
		<Container>
			{hiveId ? (
				<>
					<HiveHeader
						navigation={navigation}
						hiveName={hiveNameState}
						handleLeave={() =>
							handleLeaveHive(userId, dispatch, setHiveMembers)
						}
					/>
					<ScrollView>
						{sortedMembers.map(member => (
							<HiveMemberRow
								key={member.user_id}
								member={member}
								borderColor={getBorderColor(
									member,
									worstPlayer,
									allCompleted,
								)}
								onPress={() => handleMemberPress(member)}
								worstPlayer={worstPlayer}
								allCompleted={allCompleted}
							/>
						))}
					</ScrollView>
					<HiveMemberModal
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						selectedMember={selectedMember}
					/>
				</>
			) : (
				<>
					<Input
						placeholder="Enter Hive Name"
						value={hiveName}
						onChangeText={setHiveName}
					/>
					<JoinButton
						title="Join or Create Hive"
						onPress={() =>
							handleJoinHive(
								hiveName,
								userId,
								dispatch,
								setHiveMembers,
								setHiveName,
							)
						}
					/>
				</>
			)}
		</Container>
	);
};

export default HiveView;
