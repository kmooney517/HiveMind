import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 16px;
`;

export const Input = styled.TextInput`
	width: 100%;
	padding: 12px;
	margin-bottom: 16px;
	border-width: 1px;
	border-color: #ccc;
	border-radius: 4px;
`;

export const JoinButton = styled.Button`
	margin-top: 12px;
`;

export const LeaveButton = styled.Button`
	margin-top: 12px;
`;

export const HiveMembersTitle = styled.Text`
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 16px;
`;

export const MemberItem = styled.View`
	padding: 10px;
	margin-bottom: 10px;
	border-width: 1px;
	border-color: #ccc;
	border-radius: 4px;
	width: 100%;
	align-items: center;
`;

export const MemberText = styled.Text`
	font-size: 18px;
`;
