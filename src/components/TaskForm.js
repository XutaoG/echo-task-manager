import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/index";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { FaCirclePlus, FaCircleCheck } from "react-icons/fa6";
import Category from "./Category";
import Warning from "./Warning";
import "../styles/task-form.css";

function TaskForm()
{
	const warningMessages = {
		emptyName: "Name cannot be empty",
		maxNameLength: "Name cannot be longer than 20 characters",
		maxDescriptionLength: "Description cannot be longer than 200 characters",
		pastDueDate: "Due date cannot be from the past",
		maxCategoryLength: "Task cannot have more than 3 categories"
	};

	const dispatch = useDispatch();

	const categories = useSelector(state => state.categories);

	const [nameInput, setNameInput] = useState("");

	const [descriptionInput, setDescriptionInput] = useState("");

	const [priorityInput, setPriorityInput] = useState("none");

	const [dueDateInput, setDueDateInput] = useState(new Date().toISOString().slice(0, 10));

	const [categoriesInput, setCategoriesInput] = useState([]);

	const [warnings, setWarnings] = useState([]);

	const handleNameInputChange = (event) =>
	{
		setWarnings([]);

		setNameInput(event.target.value);
	};

	const handleDescriptionInputchange = (event) =>
	{
		setWarnings([]);

		setDescriptionInput(event.target.value);
	};

	const handlePriorityInputChange = (event) =>
	{
		setPriorityInput(event.target.value);
	};

	const handleDueDateInputChange = (event) =>
	{
		event.preventDefault();

		setWarnings([]);

		setDueDateInput(event.target.value);
	}

	const handleAddCategory = (categoryId) =>
	{
		setWarnings([]);

		setCategoriesInput([...categoriesInput, categoryId]);
	}

	const handleRemoveCategory = (categoryId) =>
	{
		setWarnings([]);

		const updatedCategoriesInput = categoriesInput.filter(tempCategoryId =>
		{
			return tempCategoryId !== categoryId;
		});

		setCategoriesInput(updatedCategoriesInput);
	}

	const handleSubmit = (event) =>
	{
		event.preventDefault();

		// Tracks the warning generated upon submit
		let generatedWarnings = [];

		// Check if name is empty
		if (nameInput.trim() === "")
		{
			generatedWarnings.push("emptyName");
		}

		// Check if name is at max length
		if (nameInput.trim().length > 20)
		{
			generatedWarnings.push("maxNameLength");
		}
		
		// Check if description is at max length
		if (descriptionInput.trim().length > 200)
		{
			generatedWarnings.push("maxDescriptionLength");
		}

		// Check if due date is in the past
		if (new Date(dueDateInput).getTime() - new Date(new Date().toISOString().slice(0, 10)).getTime() < 0)
		{
			generatedWarnings.push("pastDueDate");
		}

		// Check if task has more than 3 categories
		if (categoriesInput.length > 3)
		{
			generatedWarnings.push("maxCategoryLength");
		}

		setWarnings([...generatedWarnings]);

		if (generatedWarnings.length > 0)
		{
			return;
		}

		// Check if all categories are valid
		categoriesInput.filter(categoryId =>
		{
			for (let category of categories)
			{
				if (category.id === categoryId)
				{
					return true;
				}
			}
			return false;
		})

		const task = {
			id: nanoid(),
			name: nameInput.trim(),
			description: descriptionInput.trim(),
			priority: priorityInput,
			dueDate: dueDateInput,
			categories: categoriesInput,
			completed: false
		};

		dispatch(addTask(task));
	};

	const renderedCategories = categories.map((category) =>
	{
		return (
			<CategoryWidget
				key={ category.id }
				category={ category }
				onAdd={ handleAddCategory }
				onRemove={ handleRemoveCategory } />
		);
	});

	const renderedWarnings = warnings.map(warning =>
	{
		return (
			<Warning key={ warningMessages[warning] } message={ warningMessages[warning] } />
		)
	});

	return (
		<div className="task-form">
			<div className="task-form-header">Add Task</div>
			{ renderedWarnings }
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
				<input type="date" value={ dueDateInput } onChange={ handleDueDateInputChange } onKeyDown={ e => e.preventDefault() } />
				<p>Category:</p>
				<div className="task-form-category-list">
					{ renderedCategories }
				</div>
				<div className="task-button-wrapper">
					<button className="task-add-button">
						Add Task
					</button>
				</div>
			</form>
		</div>
	);
}

function CategoryWidget({ category, onAdd, onRemove })
{
	const [hasAdded, setHasAdded] = useState(false);

	const renderedIcon = hasAdded ? <FaCircleCheck /> : <FaCirclePlus />

	const handleClick = () =>
	{
		// If hasAdded is true, remove category
		if (hasAdded)
		{
			onRemove(category.id);
		}
		else
		{
			onAdd(category.id);
		}

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