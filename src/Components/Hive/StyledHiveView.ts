import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	padding: 20px;
	background-color: #f0f4f8;
`;

export const HiveMembersTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
`;

export const MemberItem = styled.TouchableOpacity<{borderColor: string}>`
	border-width: 2px;
	border-color: ${({borderColor}) => borderColor};
	padding: 10px;
	margin-bottom: 10px;
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

export const MemberText = styled.Text`
	font-size: 16px;
`;

export const CompletedView = styled.View`
	flex: 1;
	align-items: flex-end;
`;

export const CurrentlyLosingText = styled.Text`
	color: red;
`;

export const PendingText = styled.Text`
	color: gray;
`;

export const Input = styled.TextInput`
	padding: 15px;
	margin-bottom: 20px;
	border-radius: 8px;
	border-width: 1px;
	border-color: #dcdcdc;
	background-color: #fff;
	font-size: 16px;
`;

export const JoinButton = styled.Button`
	background-color: #007aff;
	padding: 10px;
	border-radius: 8px;
	color: #fff;
`;

export const ModalContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
	background-color: #fff;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	padding: 25px;
`;

export const CloseButton = styled.Button`
	background-color: #ff0000;
	padding: 10px;
	border-radius: 8px;
	color: #fff;
`;
