// src/components/AuthScreen.tsx
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from './AuthContext';
import {
	Container,
	Wrapper,
	Title,
	Input,
	AuthButton,
	ToggleAuthButton,
	ButtonText,
} from './StyledAuth';

const AuthScreen: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigation = useNavigation();
	const {isSignUp, toggleAuthMode, handleAuth} = useAuth();

	const onAuth = async () => {
		try {
			await handleAuth(email, password);
			navigation.navigate('Home');
		} catch (error: any) {
			Alert.alert(
				'Authentication Error',
				error.message || 'An error occurred during authentication.',
			);
		}
	};

	const formFields = [
		{
			placeholder: 'Email',
			value: email,
			onChangeText: setEmail,
			keyboardType: 'email-address',
			autoCapitalize: 'none',
			secureTextEntry: false,
		},
		{
			placeholder: 'Password',
			value: password,
			onChangeText: setPassword,
			secureTextEntry: true,
		},
	];

	return (
		<Container source={require('./background.png')}>
			<Wrapper>
				<Title>HiveMind</Title>
				{formFields.map((inputProps, index) => (
					<Input
						key={index}
						placeholder={inputProps.placeholder}
						value={inputProps.value}
						onChangeText={inputProps.onChangeText}
						keyboardType={inputProps.keyboardType}
						autoCapitalize={inputProps.autoCapitalize}
						placeholderTextColor="#888"
						secureTextEntry={inputProps.secureTextEntry}
					/>
				))}
				<AuthButton onPress={onAuth}>
					<ButtonText color={'#fff'}>
						{isSignUp ? 'Sign Up' : 'Sign In'}
					</ButtonText>
				</AuthButton>
				<ToggleAuthButton onPress={toggleAuthMode}>
					<ButtonText color={'#ffcc00'}>
						{isSignUp ? 'Sign In' : 'Sign Up'}
					</ButtonText>
				</ToggleAuthButton>
			</Wrapper>
		</Container>
	);
};

export default AuthScreen;
