import styled from 'styled-components/native';

export const Keyboard = styled.View`
	align-items: center;
	justify-content: center;
`;

export const Row = styled.View`
	flex-direction: row;
	justify-content: center;
	margin-bottom: 5px;
`;

export const Key = styled.TouchableOpacity`
	background-color: ${props => props.backgroundColor};
	padding: 20px;
	margin: 5px;
	border-radius: 5px;
	align-items: center;
	min-width: ${props => props.minWidth}px;
`;

export const KeyText = styled.Text`
	font-size: 18px;
	font-weight: bold;
`;
