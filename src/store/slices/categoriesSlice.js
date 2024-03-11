import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
	name: "categories",
	initialState: [
		{ id: "school", name: "School", color: "orange" },
		{ id: "financial", name: "Financial", color: "green" },
		{ id: "life", name: "Life", color: "blue" },
		{ id: "diet", name: "Diet", color: "purple" }
	],
	reducers: {
		addCategory: (state, action) =>
		{
			// payload will contain category object
			state.push(action.payload);
		},
		removeCategory: (state, action) =>
		{
			// payload will contain id of the category to be removed
			const updatedCategories = state.filter(category =>
			{
				return category.id !== action.payload;
			})

			return updatedCategories;
		}
	}
});

export const categoriesReducer = categoriesSlice.reducer;
export const { addCategory, removeCategory } = categoriesSlice.actions;