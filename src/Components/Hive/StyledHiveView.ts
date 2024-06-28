// src/components/StyledHiveView.tsx
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	padding: 20px;
	background-color: #f0f0f0;
`;

export const TopView = styled.View`
	display: flex;
	margin-bottom: 10px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const MemberView = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

export const MemberDetails = styled.View`
	flex-direction: column;
	flex: 1;
	align-items: flex-start;
`;

export const CompletedView = styled.View`
	flex: 1;
	align-items: flex-end;
`;

export const CurrentlyLosingText = styled.Text`
	color: red;
`;

export const PendingText = styled.Text`
	flex: 1;
`;

export const HiveMembersTitle = styled.Text`
	font-size: 24px;
	font-weight: bold;
	color: #333;
`;

export const Input = styled.TextInput`
	width: 100%;
	padding: 15px;
	margin-bottom: 20px;
	border-radius: 8px;
	border-width: 1px;
	border-color: #dcdcdc;
	background-color: #fff;
	font-size: 16px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const JoinButton = styled.Button`
	width: 100%;
	padding: 15px;
	margin-top: 10px;
	border-radius: 8px;
	background-color: #4b9ce2;
	align-items: center;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const LeaveButton = styled.Button`
	width: 100%;
	padding: 15px;
	margin-top: 10px;
	border-radius: 8px;
	background-color: #ff0000;
	align-items: center;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MemberItem = styled.View`
	border-width: 2px;
	padding: 10px;
	margin-bottom: 10px;
	border-color: ${props => props.borderColor};
`;

export const MemberText = styled.Text`
	font-size: 16px;
	color: #333;
`;

export const BackButton = styled.TouchableOpacity``;
