import { createSlice } from '@reduxjs/toolkit';

const formEntrySlice = createSlice({
	name: 'formEntrySlice',
	initialState: {
		formView: 'registration',
	},
	reducers: {
		handleClickEntry: (state, action) => {
			state.formView = 'entry';
		},
		handleClickRecovery: (state, action) => {
			state.formView = 'recovery';
		},
		handleClickRegistration: (state, action) => {
			state.formView = 'registration';
		},
	},
});

export const { handleClickEntry, handleClickRecovery, handleClickRegistration } = formEntrySlice.actions;
export default formEntrySlice.reducer;
