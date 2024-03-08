import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
	name: "tasks",
	initialState: [],
	reducers: {
		addTask: (state, action) =>
		{
			// payload contains a task object { name: string, description: string }
			state.push(action.payload);
		},
		removeTask: (state, action) =>
		{
			// payload contains the id of the task to be removed
			const index = state.find(task => task.id === action.payload);

			state.splice(index, 1);
		}
	}
})

export const tasksReducer = tasksSlice.reducer;
export const { addTask, removeTask } = tasksSlice.actions;