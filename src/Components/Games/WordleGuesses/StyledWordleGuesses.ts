import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	padding: 20px;
	background-color: #f5f5f5;
`;

export const DateInput = styled.TextInput`
	width: 100%;
	padding: 15px;
	margin-bottom: 20px;
	border-radius: 8px;
	border-width: 1px;
	border-color: #ddd;
	background-color: #fff;
	font-size: 16px;
`;

export const FetchButton = styled.TouchableOpacity`
	width: 100%;
	padding: 15px;
	margin-bottom: 20px;
	border-radius: 8px;
	background-color: #ffcc00;
	align-items: center;
`;

export const ButtonText = styled.Text`
	color: #fff;
	font-size: 16px;
	font-weight: bold;
`;

export const GuessGroup = styled.View`
	margin-bottom: 20px;
`;

export const GroupTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
`;

export const UserGrids = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
`;

export const GridWrapper = styled.View`
	margin: 10px;
	align-items: center;
`;

export const UserText = styled.Text`
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 10px;
`;

export const MessageText = styled.Text`
	font-size: 18px;
	color: red;
	text-align: center;
	margin-top: 20px;
`;
