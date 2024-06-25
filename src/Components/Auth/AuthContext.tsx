// src/contexts/AuthContext.tsx
import React, {createContext, useContext, useState} from 'react';
import {getSupabaseClient, setSupabaseAuthSession} from '@supabaseClient';
import {useDispatch} from 'react-redux';
import {setUser, clearUser} from '@redux/authSlice';
import {setHive, clearHive} from '@redux/hiveSlice';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
	const [isSignUp, setIsSignUp] = useState(false);
	const dispatch = useDispatch();

	const toggleAuthMode = () => {
		setIsSignUp(!isSignUp);
	};

	const handleAuth = async (email, password) => {
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

			// Fetch the hive information
			const {data: hiveData, error: hiveError} = await supabase
				.from('hive_memberships')
				.select('hive_id, hives(name)')
				.eq('user_id', user.id);

			if (hiveError) {
				throw hiveError;
			}

			if (hiveData.length > 0) {
				const hive = hiveData[0];
				dispatch(setHive({id: hive.hive_id, name: hive.hives.name}));
			} else {
				dispatch(clearHive());
			}
		} catch (error) {
			console.error(
				'Authentication Error',
				error.message || 'An error occurred during authentication.',
			);
		}
	};

	const signOut = async () => {
		const supabase = getSupabaseClient();
		await supabase.auth.signOut();
		dispatch(clearUser());
		dispatch(clearHive());
	};

	return (
		<AuthContext.Provider
			value={{isSignUp, toggleAuthMode, handleAuth, signOut}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
