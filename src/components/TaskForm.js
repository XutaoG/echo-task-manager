import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/index";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { FaCirclePlus, FaCircleXmark } from "react-icons/fa6";
import Category from "./Category";
import "../styles/task-form.css";

function TaskForm()
{
	const dispatch = useDispatch();

	const categories = useSelector(state => state.categories);

	const [nameInput, setNameInput] = useState("");

	const [descriptionInput, setDescriptionInput] = useState("");

	const [priorityInput, setPriorityInput] = useState("none");

	const [dueDateInput, setDueDateInput] = useState(new Date().toISOString().slice(0, 10));

	const [categoriesInput, setCategoriesInput] = useState([]);

	const handleNameInputChange = (event) =>
	{
		setNameInput(event.target.value);
	};

	const handleDescriptionInputchange = (event) =>
	{
		setDescriptionInput(event.target.value);
	};

	const handlePriorityInputChange = (event) =>
	{
		setPriorityInput(event.target.value);
	};

	const handleDueDateInputChange = (event) =>
	{
		setDueDateInput(event.target.value);
	}

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

	const renderedCategories = categories.map((category) =>
	{
		return (
			<CategoryWidget
				key={ category.id }
				category={ category } />
		);
	});

	return (
		<div className="task-form">
			<div className="task-form-header">Add Task</div>
			<form onSubmit={ handleSubmit } className="task-form-inputs">
				<p>Task Name:</p>
				<input value={ nameInput } onChange={ handleNameInputChange } />
				<p>Description:</p>
				<input value={ descriptionInput } onChange={ handleDescriptionInputchange } />
				<p>Priority:</p>
				<select value={ priorityInput } onChange={ handlePriorityInputChange }>
					<option value="none">None</option>
					<option value="low">Low Priority</option>
					<option value="medium">Medium Priority</option>
					<option value="High">High Priority</option>
				</select>
				<p>Due Date:</p>
				<input type="date" value={ dueDateInput } onChange={ handleDueDateInputChange } />
				<p>Category:</p>
				<div className="task-form-category-list">
					{ renderedCategories }
				</div>
				<div className="task-button-wrapper">
					<button className="task-add-button">Add Task</button>
				</div>
			</form>
		</div>
	);
}

function CategoryWidget({ category, onAdd, onRemove })
{
	const [hasAdded, setHasAdded] = useState(false);

	const renderedIcon = hasAdded ? <FaCircleXmark /> : <FaCirclePlus />

	const handleClick = () =>
	{
		setHasAdded(value => !value);
	};

	return (
		<div
			className="task-form-category-display-wrapper"
		>
			<div 
				className="task-force-category-icon"
				onClick={ handleClick }
			>
				{ renderedIcon }
			</div>
			<Category name={ category.name } color={ category.color } />
		</div>
	);
}

export default TaskForm;