import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #b0c4de;
	padding: 20px;
	width: 100%;
	align-self: center;
`;

export const Wrapper = styled.View`
	align-items: center;
	width: 70%;
`;

export const Title = styled.Text`
	font-size: 38px;
	font-weight: bold;
	color: #ffcc00;
	margin-bottom: 30px;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const Input = styled.TextInput`
	width: 100%;
	padding: 15px;
	margin-bottom: 20px;
	border-radius: 8px;
	border-width: 1px;
	border-color: #ddd;
	background-color: #fff;
	font-size: 16px;
`;

export const AuthButton = styled.TouchableOpacity`
	width: 100%;
	padding: 15px;
	margin-top: 10px;
	border-radius: 8px;
	background-color: #ffcc00;
	align-items: center;
`;

export const ToggleAuthButton = styled.TouchableOpacity`
	width: 100%;
	padding: 15px;
	margin-top: 10px;
	border-radius: 8px;
	background-color: #000;
	align-items: center;
`;

export const ButtonText = styled.Text`
	color: #fff;
	font-size: 16px;
	font-weight: bold;
`;
