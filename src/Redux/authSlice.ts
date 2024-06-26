import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@redux/store';
import { clearProfile } from './profileSlice';

interface AuthState {
	user: any;
	token: { access_token: string; refresh_token: string } | null;
}

const initialState: AuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (
			state,
			action: PayloadAction<{
				user: any;
				token: { access_token: string; refresh_token: string };
			}>,
		) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		signOut: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setUser, signOut } = authSlice.actions;

export const performSignOut = () => (dispatch: AppDispatch) => {
	dispatch(signOut());
	dispatch(clearProfile());
};

export default authSlice.reducer;