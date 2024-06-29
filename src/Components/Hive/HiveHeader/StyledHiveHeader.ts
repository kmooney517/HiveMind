import styled from 'styled-components/native';

export const TopView = styled.View`
	display: flex;
	margin-bottom: 10px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
	padding: 10px;
`;

export const HiveMembersTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
`;

export const LeaveButton = styled.Button`
	background-color: #ffcc00;
	padding: 10px;
	border-radius: 8px;
	color: #fff;
`;
