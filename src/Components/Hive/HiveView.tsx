import React, {useState, useEffect} from 'react';
import {ScrollView, View, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@redux/store';
import {
	fetchHiveMembers,
	handleJoinHive,
	handleLeaveHive,
	determineWorstPlayer,
	sortHiveMembers,
	getBorderColor,
	setStarterWord as setStarterWordInDatabase,
	checkIfWordValid,
} from './hiveUtils';
import {
	Container,
	MemberText,
	Input,
	JoinButton,
	StarterWordInput,
	StarterWordButton,
} from './StyledHiveView';
import {HiveHeader} from './HiveHeader';
import HiveMemberRow from './HiveMemberRow';
import HiveMemberModal from './HiveMemberModal';

const HiveView: React.FC = ({navigation}) => {
	const [hiveName, setHiveName] = useState<string>('');
	const [hiveMembers, setHiveMembers] = useState<any[]>([]);
	const [starterWordState, setStarterWordState] = useState<string | null>(
		null,
	);
	const [starterWordDate, setStarterWordDate] = useState<string | null>(null);
	const [newStarterWord, setNewStarterWord] = useState<string>('');
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [selectedMember, setSelectedMember] = useState<any>(null);
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const hiveId = useSelector((state: RootState) => state.hive.id);
	const hiveNameState = useSelector((state: RootState) => state.hive.name);
	const dispatch = useDispatch();

	useEffect(() => {
		if (hiveId) {
			fetchHiveMembers(hiveId, setHiveMembers, (word, date) => {
				setStarterWordState(word);
				setStarterWordDate(date);
			});
		}
	}, [hiveId]);

	const worstPlayer = determineWorstPlayer(hiveMembers);
	const allCompleted = hiveMembers.every(member => member.completedToday);
	const sortedMembers = sortHiveMembers(hiveMembers, worstPlayer);

	const handleMemberPress = member => {
		setSelectedMember(member);
		setModalVisible(true);
	};

	const handleSetStarterWord = async () => {
		if (newStarterWord.length === 5) {
			const isValid = await checkIfWordValid(newStarterWord);
			if (isValid) {
				const today = new Date();
				today.setDate(today.getDate() + 1);
				const year = today.getFullYear();
				const month = String(today.getMonth() + 1).padStart(2, '0');
				const day = String(today.getDate()).padStart(2, '0');
				const dateString = `${year}-${month}-${day}`;

				await setStarterWordInDatabase(
					hiveId,
					dateString,
					newStarterWord,
					dispatch,
				);
				setNewStarterWord('');
			} else {
				Alert.alert(
					'Invalid word. Please enter a valid 5-letter word.',
				);
			}
		} else {
			Alert.alert('Starter word must be 5 letters.');
		}
	};

	const today = new Date();
	today.setDate(today.getDate() + 1);
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	const tomorrowDateString = `${year}-${month}-${day}`;

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
					{userId === worstPlayer?.user_id &&
						allCompleted &&
						starterWordDate !== tomorrowDateString && (
							<View>
								<StarterWordInput
									placeholder="Set starter word for tomorrow"
									value={newStarterWord}
									onChangeText={setNewStarterWord}
								/>
								<StarterWordButton
									title="Set Starter Word"
									onPress={handleSetStarterWord}
								/>
							</View>
						)}

					{starterWordState && (
						<View>
							<MemberText>
								Starter Word for {starterWordDate}:{' '}
								{starterWordState}
							</MemberText>
						</View>
					)}
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
