import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/index";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import CategorySelection from "./CategorySelection";

function TaskForm()
{
	const dispatch = useDispatch();

	const categories = useSelector(state => state.categories);

	const [nameInput, setNameInput] = useState(""); // string
	const [descriptionInput, setDescriptionInput] = useState(""); // string
	const [categoriesInput, setCategoriesInput] = useState([]); // list of category objects

	const handleNameInputChange = (event) =>
	{
		setNameInput(event.target.value);
	};

	const handleDescriptionInputchange = (event) =>
	{
		setDescriptionInput(event.target.value);
	};

	const handleAddCategory = (toBeAddedCategory) =>
	{
		setCategoriesInput([...categoriesInput, toBeAddedCategory]);
	};

	const handleRemoveCategory = (toBeRemovedCategory) =>
	{
		const updatedCategories = categoriesInput.filter(category =>
		{
			return category.id !== toBeRemovedCategory.id;
		});

		setCategoriesInput(updatedCategories);
	};

	const handleSubmit = (event) =>
	{
		event.preventDefault();

		const task = {
			id: nanoid(),
			name: nameInput,
			description: descriptionInput,
			categories: categoriesInput
		};

		dispatch(addTask(task));
	};

	const renderedCategories = categories.map(category =>
	{
		return (
			<div key={ category.id } className="ml-3">
				<CategorySelection
					label={ category.name }
					onAddCategory={ () => handleAddCategory(category) }
					onRemoveCategory={ () => handleRemoveCategory(category) } />
			</div>
		)
	});

	return (
		<div className="bg-white rounded-xl p-4 mx-12">
			<p className="text-3xl mb-3">
				Add Task
			</p>
			<form onSubmit={ handleSubmit }>
				<p className="text-lg font-medium mb-1.5">
					Task Name
				</p>
				<input
					className="border-2 border-gray-400 w-full rounded-full pl-4 py-1.5 mb-3"
					onChange={ handleNameInputChange }
					value={ nameInput } />

				<p className="text-lg font-medium mb-1.5">
					Description
				</p>
				<input
					className="border-2 border-gray-400 w-full rounded-full pl-4 py-1.5 mb-3"
					onChange={ handleDescriptionInputchange }
					value={ descriptionInput } />

				<p className="text-lg font-medium mb-1.5">
					Category
				</p>
				<div className="mb-3 flex">
					{ renderedCategories }
				</div>

				<div>
					<Button primary className="w-24 rounded-lg">Add</Button>
				</div>
			</form>
		</div>
	);
}

export default TaskForm;