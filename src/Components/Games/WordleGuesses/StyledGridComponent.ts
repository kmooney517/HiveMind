import styled from 'styled-components/native';

export const GridWrapper = styled.View`
	margin-bottom: 20px;
	margin-right: 20px;
	align-items: center;
`;

export const UserEmail = styled.Text`
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 10px;
`;

export const GridContainer = styled.View`
	margin-bottom: 20px;
`;

export const Row = styled.View`
	flex-direction: row;
`;

export const Cell = styled.View`
	width: ${props => (props.mini ? 20 : 40)}px;
	height: ${props => (props.mini ? 20 : 40)}px;
	margin: 2px;
	align-items: center;
	justify-content: center;
`;

export const Letter = styled.Text`
	font-size: 18px;
	font-weight: bold;
`;
