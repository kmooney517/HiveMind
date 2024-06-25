// src/components/StyledAuth.tsx
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #f0f4f8;
	padding: 20px;
	width: 100%;
`;

export const Wrapper = styled.View`
	align-items: center;
	width: 85%;
`;

export const Title = styled.Text`
	font-size: 36px;
	font-weight: bold;
	color: #4b9ce2;
	margin-bottom: 30px;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.TextInput`
	width: 100%;
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
	width: 100%;
	padding: 15px;
	margin-top: 10px;
	border-radius: 8px;
	background-color: #4b9ce2;
	align-items: center;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ToggleAuthButton = styled.TouchableOpacity`
	width: 100%;
	padding: 15px;
	margin-top: 10px;
	border-radius: 8px;
	background-color: #ffcc00;
	align-items: center;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ButtonText = styled.Text`
	color: ${props => props.color};
	font-size: 16px;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(255, 204, 0, 0.6);
`;
