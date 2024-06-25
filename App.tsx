import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@redux/store';
import AppNavigator from '@navigation/AppNavigator';
import {AuthProvider} from '@auth/AuthContext';

const App = (): React.JSX.Element => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AuthProvider>
					<AppNavigator />
				</AuthProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
