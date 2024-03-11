import { createSlice } from "@reduxjs/toolkit";

const taskViewSlice = createSlice({
	name: "task view",
	initialState: null,
	reducers: {
		changeViewedTask: (state, action) =>
		{
			// payload contains the id of task to be viewed
			return action.payload;
		}
	}
});

export const taskViewReducer = taskViewSlice.reducer;
export const { changeViewedTask } = taskViewSlice.actions;