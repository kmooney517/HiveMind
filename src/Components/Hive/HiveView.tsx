import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@redux/store';
import {
	fetchMembers,
	handleJoinHive,
	handleLeaveHive,
	determineWorstPlayer,
} from './hiveHelpers';
import Grid from '../Games/WordleGuesses/Grid';
import {
	Container,
	Input,
	JoinButton,
	LeaveButton,
	HiveMembersTitle,
	MemberItem,
	MemberText,
	TopView,
	MemberView,
	MemberDetails,
	CompletedView,
	CurrentlyLosingText,
	PendingText,
	BackButton,
} from './StyledHiveView';

const HiveView: React.FC = ({navigation}) => {
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

	const worstPlayer = determineWorstPlayer(hiveMembers);
	const allCompleted = hiveMembers.every(member => member.completedToday);

	return (
		<Container>
			{hiveId ? (
				<>
					<TopView>
						<BackButton onPress={() => navigation.navigate('Home')}>
							<HiveMembersTitle>
								← {hiveNameState}
							</HiveMembersTitle>
						</BackButton>
						<LeaveButton
							title="Leave Hive"
							onPress={() =>
								handleLeaveHive(
									userId,
									dispatch,
									setHiveMembers,
								)
							}
						/>
					</TopView>
					<ScrollView>
						{hiveMembers.map(member => (
							<MemberItem
								key={member.user_id}
								borderColor={
									member.user_id === worstPlayer?.user_id &&
									allCompleted
										? 'red'
										: member.completedToday
										? 'green'
										: 'yellow'
								}>
								<MemberView>
									<MemberDetails>
										<MemberText>{member.name}</MemberText>
										{member.user_id ===
											worstPlayer?.user_id && (
											<CurrentlyLosingText>
												{allCompleted
													? 'LOST'
													: 'Currently losing'}
											</CurrentlyLosingText>
										)}
									</MemberDetails>
									{member.completedToday ? (
										<CompletedView>
											<Grid
												mini={true}
												guesses={member.guessData}
											/>
										</CompletedView>
									) : (
										<PendingText>Today pending</PendingText>
									)}
								</MemberView>
							</MemberItem>
						))}
					</ScrollView>
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
