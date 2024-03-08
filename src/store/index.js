import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer, addTask, removeTask } from "./slices/tasksSlice";
import { formReducer, changeNameInput, changeDescriptionInput } from "./slices/formSlice";

const store = configureStore({
	reducer: {
		form: formReducer,
		tasks: tasksReducer
	}
});

export default store;
export { changeNameInput, changeDescriptionInput };
export { addTask, removeTask };