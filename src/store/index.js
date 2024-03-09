import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer, addTask, removeTask } from "./slices/tasksSlice";
import { selectedTaskReducer, changeTask } from "./slices/selectedTaskSlice";
import { categoriesReducer, addCategory, removeCategory } from "./slices/categoriesSlice";

const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		selectedTask: selectedTaskReducer,
		categories: categoriesReducer
	}
});

export default store;
export { addTask, removeTask };
export { changeTask };
export { addCategory, removeCategory };