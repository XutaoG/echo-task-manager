import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
	name: "tasks",
	initialState: [
		{
			id: "temp1",
			name: "Task 1",
			description: "Finish task 1",
			priority: "high",
			dueDate: "2024-04-17",
			categories: [
				"temp1", "temp2"
			],
			completed: true
		},
		{
			id: "temp2",
			name: "Task 2",
			description: "",
			priority: "medium",
			dueDate: "2024-03-09",
			categories: [
				"temp1", "temp3"
			],
			completed: false
		},
		{
			id: "temp3",
			name: "Task 3",
			description: "",
			priority: "none",
			dueDate: "2024-06-12",
			categories: [
				"temp2"
			],
			completed: false
		},
	],
	reducers: {
		addTask: (state, action) =>
		{
			// payload contains a task object { name: string, description: string }
			state.push(action.payload);
		},
		removeTask: (state, action) =>
		{
			// payload contains the id of the task to be removed
			const updatedTasks = state.filter(task =>
			{
				return task.id !== action.payload;
			})

			return updatedTasks;
		},
		markCompletion: (state, action) =>
		{
			// payload contains the id of the task to be modified
			const updatedTasks = state.map(task =>
			{
				if (task.id === action.payload)
				{
					return {...task, completed: !task.completed};
				}
				return task;
			})

			return updatedTasks;
		}
	}
})

export const tasksReducer = tasksSlice.reducer;
export const { addTask, removeTask, markCompletion } = tasksSlice.actions;