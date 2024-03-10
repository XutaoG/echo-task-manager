import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
	name: "categories",
	initialState: [],
	reducers: {
		addCategory: (state, action) =>
		{
			// payload will contain category object
			state.push(action.payload);
		},
		removeCategory: (state, action) =>
		{
			// payload will contain id of the category to be removed
			const index = state.indexOf(category => category.id === action.payload);

			state.splice(index, 1);
		}
	}
});

export const categoriesReducer = categoriesSlice.reducer;
export const { addCategory, removeCategory } = categoriesSlice.actions;