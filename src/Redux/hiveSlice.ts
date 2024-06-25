// src/Redux/hiveSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface HiveState {
	id: string | null;
	name: string | null;
}

const initialState: HiveState = {
	id: null,
	name: null,
};

const hiveSlice = createSlice({
	name: 'hive',
	initialState,
	reducers: {
		setHive(state, action: PayloadAction<{id: string; name: string}>) {
			state.id = action.payload.id;
			state.name = action.payload.name;
		},
		clearHive(state) {
			state.id = null;
			state.name = null;
		},
	},
});

export const {setHive, clearHive} = hiveSlice.actions;
export default hiveSlice.reducer;
