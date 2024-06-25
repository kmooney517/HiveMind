import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthScreen from '@auth/AuthScreen';
import Wordle from '@wordle';
import WordleGuesses from '@games/WordleGuesses';
import HomeScreen from '@home/HomeScreen';
import {useSelector} from 'react-redux';
import JoinHive from '@hive/JoinHive';
import {RootState} from '@redux/store';

const Stack = createNativeStackNavigator();

const AppNavigator = (): React.JSX.Element => {
	const user = useSelector((state: RootState) => state.auth.user);
	const hive = useSelector((state: RootState) => state.hive);

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					animation: 'none',
					headerStyle: {
						backgroundColor: '#b0c4de', // Set your desired header color here
					},
				}}>
				{user ? (
					<>
						<Stack.Screen
							options={{headerShown: false}}
							name="Home"
							component={HomeScreen}
						/>
						<Stack.Screen name="Wordle" component={Wordle} />
						<Stack.Screen
							name="WordleGuesses"
							component={WordleGuesses}
						/>
						<Stack.Screen
							name="JoinHive"
							component={JoinHive}
							options={{
								title: hive.id ? 'Hive Details' : 'Join Hive',
							}}
						/>
					</>
				) : (
					<>
						<Stack.Screen
							options={{headerShown: false}}
							name="Auth"
							component={AuthScreen}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
