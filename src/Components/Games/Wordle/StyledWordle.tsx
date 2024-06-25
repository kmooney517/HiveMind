import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const GameContainer = styled.View`
	height: ${props => props.screenHeight * 0.6}px;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
`;

export const KeyboardContainer = styled.View`
	height: ${props => props.screenHeight * 0.3}px;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export const Message = styled.Text`
	margin-top: 16px;
	font-size: 18px;
`;
