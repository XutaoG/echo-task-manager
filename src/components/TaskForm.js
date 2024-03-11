import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/index";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import Warning from "./Warning";
import CategoryWidget from "./CategoryWidget";
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
	};

	const handleRemoveCategory = (categoryId) =>
	{
		setWarnings([]);

		const updatedCategoriesInput = categoriesInput.filter(tempCategoryId =>
		{
			return tempCategoryId !== categoryId;
		});

		setCategoriesInput(updatedCategoriesInput);
	};

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

		// Check if all categories are valid
		const updatedCategoriesInput = categoriesInput.filter(categoryId =>
		{
			for (let category of categories)
			{
				if (category.id === categoryId)
				{
					return true;
				}
			}
			return false;
		});

		// Check if task has more than 3 categories
		if (updatedCategoriesInput.length > 3)
		{
			generatedWarnings.push("maxCategoryLength");
		}

		setWarnings([...generatedWarnings]);

		if (generatedWarnings.length > 0)
		{
			return;
		}


		const task = {
			id: nanoid(),
			name: nameInput.trim(),
			description: descriptionInput.trim(),
			priority: priorityInput,
			dueDate: dueDateInput,
			categories: updatedCategoriesInput,
			completed: false
		};

		dispatch(addTask(task));

		// Reset input fields
		setNameInput("");
		setDescriptionInput("");
		setPriorityInput("none");
		setDueDateInput(new Date().toISOString().slice(0, 10));
		setCategoriesInput([]);
	};

	const renderedCategories = categories.map((category) =>
	{
		console.log(categoriesInput);

		let hasAdded = false;

		for (let categoryId of categoriesInput)
		{
			if (categoryId === category.id)
			{
				hasAdded = true;
			}
		}

		return (
			<CategoryWidget
				key={ category.id }
				category={ category }
				initialState={ hasAdded }
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
			<div className="task-form-warning-container">
				{ renderedWarnings }
			</div>
			<form onSubmit={ handleSubmit } className="task-form-inputs">
				<p>Task Name:</p>
				<input value={ nameInput } onChange={ handleNameInputChange } />
				<p>Description:</p>
				<input value={ descriptionInput } onChange={ handleDescriptionInputchange } />
				<p>Priority:</p>
				<select value={ priorityInput } onChange={ handlePriorityInputChange }>
					<option value="none">None</option>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
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



export default TaskForm;