import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@redux/store';
import AppNavigator from '@navigation/AppNavigator';
import {AuthProvider} from '@auth/AuthContext';

const safeStyle = {display: 'flex', flex: 1};

const App = (): React.JSX.Element => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AuthProvider>
					<SafeAreaView style={safeStyle}>
						<AppNavigator />
					</SafeAreaView>
				</AuthProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
