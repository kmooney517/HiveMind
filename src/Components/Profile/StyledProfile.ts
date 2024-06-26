import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 16px;
	background-color: #f0f0f0;
`;

export const Title = styled.Text`
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 16px;
`;

export const Input = styled.TextInput`
	width: 100%;
	padding: 12px;
	margin-bottom: 16px;
	border-width: 1px;
	border-color: #ccc;
	border-radius: 4px;
`;

export const ButtonRow = styled.View`
	flex-direction: row;
	justify-content: space-around;
	width: 100%;
`;

export const SaveButton = styled.Button`
	margin-top: 12px;
`;

export const CancelButton = styled.Button`
	margin-top: 12px;
`;

export const ProfileText = styled.Text`
	font-size: 18px;
	margin-top: 16px;
`;
