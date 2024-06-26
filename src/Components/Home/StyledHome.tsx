// src/Games/StyledHome.tsx

import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	padding: 16px;
	background-color: #f0f0f0;
`;

export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

export const WelcomeText = styled.Text`
	font-size: 20px;
	font-weight: bold;
`;

export const ButtonRow = styled.View`
	flex-direction: row;
	justify-content: space-around;
	width: 100%;
`;

export const Button = styled.TouchableOpacity`
	padding: 12px;
	border-radius: 8px;
	background-color: #007aff;
	align-items: center;
	margin-top: 10px;
`;

export const ButtonText = styled.Text`
	color: #ffffff;
	font-size: 16px;
	font-weight: bold;
`;

export const PlayButton = styled(Button)`
	background-color: ${({disabled}) => (disabled ? '#B0C4DE' : '#007AFF')};
`;

export const ViewScoresButton = styled(Button)`
	background-color: ${({disabled}) => (disabled ? '#B0C4DE' : '#007AFF')};
`;
