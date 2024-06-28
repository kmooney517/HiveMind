// src/components/StyledProfile.tsx
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	padding-vertical: 60px;
	padding-horizontal: 20px;
`;

export const Title = styled.Text`
	font-size: 36px;
	font-weight: bold;
	color: #4b9ce2;
	margin-bottom: 30px;
`;

export const Label = styled.Text`
	font-size: 18px;
	color: #000;
	margin-bottom: 10px;
`;

export const Input = styled.TextInput`
	width: 100%;
	padding: 15px;
	margin-bottom: 20px;
	border-radius: 8px;
	border-width: 1px;
	border-color: #dcdcdc;
	background-color: #fff;
	font-size: 18px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ButtonRow = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	width: 100%;
`;

export const StyledButton = styled.TouchableOpacity`
	padding: 10px;
	margin-right: 10px;
	border-radius: 8px;
	align-items: center;
	background-color: ${props => props.bgColor || '#4b9ce2'};
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ButtonText = styled.Text`
	color: ${props => props.color || '#fff'};
	font-size: 16px;
	font-weight: bold;
`;

export const CancelButton = styled.Button``;
