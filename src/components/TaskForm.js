import { useDispatch, useSelector } from "react-redux";
import { changeNameInput, changeDescriptionInput, addTask } from "../store/index";
import { nanoid } from "@reduxjs/toolkit";

function TaskForm()
{
	const dispatch = useDispatch();

	const { name, description } = useSelector(state => state.form);

	const onNameInputChange = (event) =>
	{
		dispatch(changeNameInput(event.target.value));
	};

	const onDescriptionInputchange = (event) =>
	{
		dispatch(changeDescriptionInput(event.target.value));
	};

	const handleSubmit = (event) =>
	{
		event.preventDefault();

		const task = {
			id: nanoid(),
			name,
			description
		};

		dispatch(addTask(task));
	};

	return (
		<div>
			<form onSubmit={ handleSubmit }>
				<h3>Name</h3>
				<input onChange={ onNameInputChange } value={ name } />
				<h3>Description</h3>
				<input onChange={ onDescriptionInputchange } value={ description } />
				<button>Add</button>
			</form>
		</div>
	);
}

export default TaskForm;