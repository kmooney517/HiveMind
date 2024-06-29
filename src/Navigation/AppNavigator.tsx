import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthScreen from '@auth/AuthScreen';
import Wordle from '@wordle';
import HomeScreen from '@home/HomeScreen';
import {useSelector} from 'react-redux';
import HiveView from '@hive/HiveView';
import Profile from '@profile';
import {RootState} from '@redux/store';

const Stack = createNativeStackNavigator();

const AppNavigator = (): React.JSX.Element => {
	const user = useSelector((state: RootState) => state.auth.user);

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					animation: 'none',
					headerStyle: {
						backgroundColor: '#b0c4de',
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
							name="HiveView"
							component={HiveView}
							options={{headerShown: false}}
						/>
						<Stack.Screen
							name="Profile"
							component={Profile}
							options={{
								headerShown: false,
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
