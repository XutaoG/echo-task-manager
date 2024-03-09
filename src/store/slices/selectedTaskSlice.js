import { createSlice } from "@reduxjs/toolkit";

const selectedTaskSlice = createSlice({
	name: "selectedTask",
	initialState: NaN,
	reducers: {
		changeTask: (state, action) =>
		{
			// payload contains ID of the task to be viewed
			return action.payload;
		},
	}
});

export const selectedTaskReducer = selectedTaskSlice.reducer;
export const { changeTask } = selectedTaskSlice.actions;