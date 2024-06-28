// src/components/StyledAuth.tsx
import styled from 'styled-components/native';
import { ImageBackground, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const calculateResponsiveSize = (baseSize, factor = 0.9) => {
	return Math.round(baseSize * factor);
};


export const Container = styled(ImageBackground).attrs({
	resizeMode: 'cover',
	opacity: 0.4
})`
	flex: 1;
	justify-content: center;
`;

export const Wrapper = styled.View`
	opacity: 1;
	border-radius: 5px;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const Title = styled.Text`
	font-size: ${calculateResponsiveSize(42, screenWidth / 375)}px;
	font-weight: bold;
	color: #ffcc00;
	margin-bottom: 10px;
	text-shadow: 1px 1px 12px rgba(0, 0, 0, 0.6);
`;

export const FormWrapper = styled.View`
	width: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;
`

export const Input = styled.TextInput`
	padding: 15px;
	margin-bottom: 20px;
	border-radius: 8px;
	border-width: 1px;
	border-color: #dcdcdc;
	background-color: #fff;
	font-size: ${calculateResponsiveSize(14, screenWidth / 375)}px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AuthButton = styled.TouchableOpacity`
	width: 50%;
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
	font-size: ${calculateResponsiveSize(14, screenWidth / 375)}px;
	font-weight: bold;

`;
