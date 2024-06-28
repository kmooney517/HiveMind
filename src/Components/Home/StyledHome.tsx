// src/components/StyledHome.tsx
import styled from 'styled-components/native';
import {ImageBackground, SafeAreaView} from 'react-native';

export const SafeAreaViewContainer = styled(SafeAreaView)`
	flex: 1;
`;

export const Container = styled(ImageBackground).attrs({
	resizeMode: 'cover',
	opacity: 0.1,
})`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

export const Header = styled.View`
	width: 100%;
	align-items: center;
	margin-bottom: 40px;
`;

export const WelcomeText = styled.Text`
	font-size: 24px;
	font-weight: bold;
	color: #ffcc00;
	margin-bottom: 20px;
`;

export const ButtonRow = styled.View`
	width: 100%;
	align-items: center;
`;

export const Button = styled.TouchableOpacity<{backgroundColor: string}>`
	width: 80%;
	padding: 15px;
	margin-bottom: 15px;
	border-radius: 8px;
	align-items: center;
	background-color: ${({backgroundColor}) => backgroundColor};
`;

export const ButtonText = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: #fff;
`;

export const PlayButton = styled(Button)`
	background-color: #007aff;
`;

export const ViewScoresButton = styled(Button)`
	background-color: #007aff;
`;
