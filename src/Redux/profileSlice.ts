// src/redux/profileSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ProfileState {
	id: string | null;
	user_id: string | null;
	name: string | null;
}

const initialState: ProfileState = {
	id: null,
	user_id: null,
	name: null,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfile(
			state,
			action: PayloadAction<{id: string; user_id: string; name: string}>,
		) {
			state.id = action.payload.id;
			state.user_id = action.payload.user_id;
			state.name = action.payload.name;
		},
		clearProfile(state) {
			state.id = null;
			state.user_id = null;
			state.name = null;
		},
	},
});

export const {setProfile, clearProfile} = profileSlice.actions;
export default profileSlice.reducer;
