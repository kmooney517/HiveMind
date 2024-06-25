import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getSupabaseClient, setSupabaseAuthSession} from '@supabaseClient';
import {setUser} from '@redux/authSlice';

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
	const [isSignUp, setIsSignUp] = useState<boolean>(false);
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const handleAuth = async () => {
		const supabase = getSupabaseClient();
		try {
			let response;
			if (isSignUp) {
				response = await supabase.auth.signUp({email, password});
			} else {
				response = await supabase.auth.signInWithPassword({
					email,
					password,
				});
			}
			if (response.error) {
				throw response.error;
			}
			const {session, user} = response.data;
			await setSupabaseAuthSession(session);
			dispatch(
				setUser({
					user,
					token: {
						access_token: session.access_token,
						refresh_token: session.refresh_token,
					},
				}),
			);
			navigation.navigate('Home');
		} catch (error: any) {
			Alert.alert(
				'Authentication Error',
				error.message || 'An error occurred during authentication.',
			);
		}
	};

	const toggleAuthMode = () => {
		setIsSignUp(!isSignUp);
	};

	return (
		<Container>
			<Wrapper>
				<Title>HiveMind</Title>
				<Input
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
					placeholderTextColor="#888"
				/>
				<Input
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					placeholderTextColor="#888"
				/>
				<AuthButton onPress={handleAuth}>
					<ButtonText>{isSignUp ? 'Sign Up' : 'Sign In'}</ButtonText>
				</AuthButton>
				<ToggleAuthButton onPress={toggleAuthMode}>
					<ButtonText>{isSignUp ? 'Sign In' : 'Sign Up'}</ButtonText>
				</ToggleAuthButton>
			</Wrapper>
		</Container>
	);
};

export default AuthScreen;
