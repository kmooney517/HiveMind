import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	padding: 20px;
`;

export const DateInput = styled.TextInput`
	width: 100%;
	padding: 10px;
	border-radius: 8px;
	border-width: 1px;
	border-color: #dcdcdc;
	background-color: #fff;
	font-size: 16px;
`;

export const GuessGroup = styled.View`
	margin-bottom: 20px;
`;

export const GroupTitle = styled.Text`
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 10px;
`;

export const UserGrids = styled.View`
	display: flex;
	flex-direction: column;
`;

export const GridWrapper = styled.View<{isWorst: boolean}>`
	padding: 10px;
	margin-bottom: 10px;
	border-width: 2px;
	border-color: ${({isWorst}) => (isWorst ? 'red' : 'transparent')};
`;

export const UserText = styled.Text`
	font-size: 16px;
`;

export const MessageText = styled.Text`
	font-size: 18px;
	color: red;
	text-align: center;
`;

export const BackButton = styled.TouchableOpacity`
	padding-vertical: 20px;
`;
