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
				"school", "financial"
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
				"school", "life"
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
				"diet"
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
					return { ...task, completed: !task.completed };
				}
				return task;
			})

			return updatedTasks;
		},
		updateTask: (state, action) =>
		{
			// payload contains a new task object
			const updatedTasks = state.map(task =>
			{
				if (task.id === action.payload.id)
				{
					return action.payload;
				}
				return task;
			});

			return updatedTasks;
		}
	}
})

export const tasksReducer = tasksSlice.reducer;
export const { addTask, removeTask, markCompletion, updateTask } = tasksSlice.actions;