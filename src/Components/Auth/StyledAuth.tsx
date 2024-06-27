// src/components/StyledAuth.tsx
import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const Container = styled(ImageBackground).attrs({
	resizeMode: 'cover',
	opacity: 0.4
})`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

export const Wrapper = styled.View`
	opacity: 1;
	align-items: center;
	width: 85%;
	padding: 40px;
	border-radius: 5px;
`;

export const Title = styled.Text`
	font-size: 52px;
	font-weight: bold;
	color: #ffcc00;
	margin-bottom: 30px;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
`;

export const Input = styled.TextInput`
	width: 80%;
	padding: 15px;
	margin-bottom: 20px;
	border-radius: 8px;
	border-width: 1px;
	border-color: #dcdcdc;
	background-color: #fff;
	font-size: 16px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AuthButton = styled.TouchableOpacity`
	width: 80%;
	padding: 15px;
	margin-top: 10px;
	border-radius: 8px;
	background-color: #ffcc00;
	align-items: center;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ToggleAuthButton = styled.TouchableOpacity`
	width: 100%;
	padding: 15px;
	margin-top: 10px;
	border-radius: 8px;
	align-items: center;
`;

export const ButtonText = styled.Text`
	color: #000;
	font-size: 24px;
	font-weight: bold;

`;
