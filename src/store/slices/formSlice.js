import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
	name: "form",
	initialState: {
		name: "",
		description: ""
	},
	reducers: {
		changeNameInput: (state, action) =>
		{
			// payload contains new name input string
			state.name = action.payload;
		},
		changeDescriptionInput: (state, action) =>
		{
			// payload contains new description input string
			state.description = action.payload;
		}
	}
});

export const formReducer = formSlice.reducer;
export const { changeNameInput, changeDescriptionInput } = formSlice.actions;