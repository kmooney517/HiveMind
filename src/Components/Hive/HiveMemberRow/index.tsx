import React from 'react';
import Grid from '../HiveGrid/Grid';
import {
	MemberItem as StyledMemberItem,
	MemberView,
	MemberDetails,
	MemberText,
	CompletedView,
	CurrentlyLosingText,
	PendingText,
} from '../StyledHiveView';

const HiveMemberRow = ({
	member,
	borderColor,
	onPress,
	worstPlayer,
	allCompleted,
}) => (
	<StyledMemberItem borderColor={borderColor} onPress={onPress}>
		<MemberView>
			<MemberDetails>
				<MemberText>{member.name}</MemberText>
				{member.user_id === worstPlayer?.user_id && (
					<CurrentlyLosingText>
						{allCompleted ? 'LOST' : 'Currently losing'}
					</CurrentlyLosingText>
				)}
			</MemberDetails>
			{member.completedToday ? (
				<CompletedView>
					<Grid mini={true} guesses={member.guessData} />
				</CompletedView>
			) : (
				<PendingText>Today pending</PendingText>
			)}
		</MemberView>
	</StyledMemberItem>
);

export default HiveMemberRow;
