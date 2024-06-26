// src/Games/StyledHome.tsx
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
	flex: 1;
	background-color: #f0f4f8;
	padding: 20px;
	width: 100%;
`;

export const StyledScrollView = styled.ScrollView``;

export const Button = styled.TouchableOpacity`
	padding-vertical: 15px;
	margin-vertical: 10px;
	margin-horizontal: 5px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex: 1;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	background-color: ${({bgColor}) => bgColor || '#4b9ce2'};
`;

export const LogoutButton = styled.TouchableOpacity`
	padding: 15px;
	border-radius: 8px;
	align-items: center;
	background-color: #4b9ce2;
	flex: 0.5;
	max-width: 100px;
`;

export const ButtonText = styled.Text`
	color: ${({color}) => color || '#ffffff'};
	font-size: 18px;
	font-weight: 600;
`;

export const Header = styled.View`
	flex-direction: row;
	align-items: center;
	padding: 16px;
	margin-bottom: 20px;
`;

export const WelcomeText = styled.Text`
	font-size: 18px;
	font-weight: 500;
	color: #333;
	flex: 0.5;
`;

export const ButtonRow = styled.View`
	flex-direction: row;
	justify-content: space-around;
	width: 100%;
	padding: 16px;
`;
