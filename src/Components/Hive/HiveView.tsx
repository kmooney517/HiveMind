import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@redux/store';
import {fetchMembers, handleJoinHive, handleLeaveHive} from './hiveHelpers';

import {
	Container,
	Input,
	JoinButton,
	LeaveButton,
	HiveMembersTitle,
	MemberItem,
	MemberText,
} from './StyledHiveView';

const HiveView: React.FC = () => {
	const [hiveName, setHiveName] = useState<string>('');
	const [hiveMembers, setHiveMembers] = useState<any[]>([]);
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const hiveId = useSelector((state: RootState) => state.hive.id);
	const hiveNameState = useSelector((state: RootState) => state.hive.name);
	const dispatch = useDispatch();

	useEffect(() => {
		if (hiveId) {
			fetchMembers(hiveId, setHiveMembers);
		}
	}, [hiveId]);

	return (
		<Container>
			{hiveId ? (
				<ScrollView>
					<HiveMembersTitle>{`Hive Members - ${hiveNameState}`}</HiveMembersTitle>
					{hiveMembers.map(member => {
						return (
							<MemberItem key={member.user_id}>
								<MemberText>{member.name}</MemberText>
							</MemberItem>
						);
					})}
					<LeaveButton
						title="Leave Hive"
						onPress={() =>
							handleLeaveHive(userId, dispatch, setHiveMembers)
						}
					/>
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
