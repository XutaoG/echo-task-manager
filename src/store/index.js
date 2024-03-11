import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer, addTask, removeTask, markCompletion, updateTask } from "./slices/tasksSlice";
import { categoriesReducer, addCategory, removeCategory } from "./slices/categoriesSlice";
import { searchReducer, changeSearchTerm } from "./slices/searchSlice";
import { taskViewReducer, changeViewedTask } from "./slices/taskViewSlice";

const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		categories: categoriesReducer,
		search: searchReducer,
		taskView: taskViewReducer
	}
});

export default store;
export { addTask, removeTask, markCompletion, updateTask };
export { addCategory, removeCategory };
export { changeSearchTerm };
export { changeViewedTask };