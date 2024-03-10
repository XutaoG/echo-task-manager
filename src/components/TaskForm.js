import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/index";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import CategorySelection from "./CategorySelection";
import "../styles/task-form.css";

function TaskForm()
{
	const dispatch = useDispatch();

	const [nameInput, setNameInput] = useState("");
	const [descriptionInput, setDescriptionInput] = useState("");

	const handleNameInputChange = (event) =>
	{
		setNameInput(event.target.value);
	};

	const handleDescriptionInputchange = (event) =>
	{
		setDescriptionInput(event.target.value);
	};

	const handleSubmit = (event) =>
	{
		event.preventDefault();

		const task = {
			id: nanoid(),
			name: nameInput,
			description: descriptionInput
		};

		dispatch(addTask(task));
	};

	return (
		<div className="task-form">
			<div className="task-form-header">Add Task</div>
			<form onSubmit={ handleSubmit } className="task-form-inputs">
				<p>Task Name:</p>
				<input value={ nameInput } onChange={ handleNameInputChange } />
				<p>Description:</p>
				<input value={ descriptionInput } onChange={ handleDescriptionInputchange } />
				<p>Priority:</p>
				<input />
				<p>Due Date:</p>
				<input />
				<p>Category:</p>
				<input />
				<div className="task-button-wrapper">
					<button className="task-add-button">Add Task</button>
				</div>
			</form>
		</div>
	);
}

export default TaskForm;