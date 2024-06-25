import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
	flex: 1;
	margin-vertical: 15px;
`;

export const StyledScrollView = styled.ScrollView``;

export const Button = styled.TouchableOpacity`
	background-color: #007aff;
	padding-vertical: 60px;
	margin-vertical: 5px;
	margin-horizontal: 20px;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
`;

export const ButtonText = styled.Text`
	color: #ffffff;
	font-size: 18px;
	font-weight: 600;
`;

export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	margin-horizontal: 20px;
`;

export const WelcomeText = styled.Text`
	font-size: 24px;
`;
