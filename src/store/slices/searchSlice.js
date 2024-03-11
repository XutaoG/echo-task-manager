import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: "",
	reducers: {
		changeSearchTerm: (state, action) =>
		{
			// paylaod contains new search keyword
			return action.payload;
		}
	}
});

export const searchReducer = searchSlice.reducer;
export const { changeSearchTerm } = searchSlice.actions;