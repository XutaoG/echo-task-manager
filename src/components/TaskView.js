import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeViewedTask } from "../store";
import CategoryWidget from "./CategoryWidget";
import Warning from "./Warning";
import "../styles/task-view.css";
import { updateTask } from "../store";

function TaskView({ task })
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

	const [nameInput, setNameInput] = useState(task.name);

	const [descriptionInput, setDescriptionInput] = useState(task.description);

	const [priorityInput, setPriorityInput] = useState(task.priority);

	const [dueDateInput, setDueDateInput] = useState(task.dueDate);

	const [categoriesInput, setCategoriesInput] = useState(task.categories);

	const [warnings, setWarnings] = useState([]);

	const handleNameInputChange = (event) =>
	{
		setWarnings([]);

		setNameInput(event.target.value);
	};

	const handleDescriptionInputChange = (event) =>
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
	};

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

		// console.log(categoriesInput);

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

		const updatedTask = {
			id: task.id,
			name: nameInput.trim(),
			description: descriptionInput.trim(),
			priority: priorityInput,
			dueDate: dueDateInput,
			categories: updatedCategoriesInput,
			completed: false
		};

		dispatch(updateTask(updatedTask));
		dispatch(changeViewedTask(null));
	}

	const renderedCategories = categories.map((category) =>
	{
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
		<div className="task-view-container">
			<form onSubmit={ handleSubmit }>
				<div className="task-view-inputs">
					<div className="task-view-name">
						<p>Name:</p>
						<input value={ nameInput } onChange={ handleNameInputChange } />
					</div>
					<div className="task-view-description">
						<p>Description:</p>
						<input value={ descriptionInput } onChange={ handleDescriptionInputChange } />
					</div>
					<div className="task-view-priority">
						<p>Priority:</p>
						<select value={ priorityInput } onChange={ handlePriorityInputChange }>
							<option value="none">None</option>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>
					<div className="task-view-date">
						<p>Due Date:</p>
						<input
							type="date"
							value={ dueDateInput }
							onChange={ handleDueDateInputChange }
							onKeyDown={ e => e.preventDefault() } />
					</div>
				</div>
				<div className="task-view-inputs">
					<div className="task-view-categories">
						<p>Category:</p>
						<div className="task-view-category-list">
							{ renderedCategories }
						</div>
					</div>
					<div className="task-view-button-wrapper">
						<button className="task-view-update-button">
							Update
						</button>
					</div>
				</div>
			</form>
			<div className="task-view-warning-container">
				{ renderedWarnings }
			</div>
		</div>
	)
}

export default TaskView;