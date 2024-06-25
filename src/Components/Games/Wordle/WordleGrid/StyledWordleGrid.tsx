import styled from 'styled-components/native';

export const Row = styled.View`
	flex-direction: row;
	margin-bottom: 10px;
`;

export const StyledTextInput = styled.TextInput`
	height: ${props => (props.screenHeight * 0.6) / 6 - 20}px;
	width: ${props => (props.screenHeight * 0.6) / 6 - 20}px;
	border-color: gray;
	border-width: 1px;
	border-radius: 8px;
	padding-horizontal: 8px;
	margin-horizontal: 4px;
	text-align: center;
	font-size: 24px;
`;
