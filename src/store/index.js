import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer, addTask, removeTask, markCompletion } from "./slices/tasksSlice";
import { categoriesReducer, addCategory, removeCategory } from "./slices/categoriesSlice";

const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		categories: categoriesReducer
	}
});

export default store;
export { addTask, removeTask, markCompletion };
export { addCategory, removeCategory };