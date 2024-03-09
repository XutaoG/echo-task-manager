import Button from "./Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../store";
import { nanoid } from "@reduxjs/toolkit";

function CategoryForm()
{
	const dispatch = useDispatch();

	const [nameInput, setNameInput] = useState("");

	const onNameInputChange = (event) =>
	{
		setNameInput(event.target.value)
	}

	const handleSubmit = (event) =>
	{
		event.preventDefault();

		const category = {
			id: nanoid(),
			name: nameInput,
			color: "blue"
		};

		dispatch(addCategory(category));
	};

	return (
		<div className="bg-white rounded-xl p-4 mx-12 mt-12">
			<p className="text-3xl mb-3">
				Add Category
			</p>
			<form onSubmit={ handleSubmit }>
				<p className="text-lg font-medium mb-1.5">
					Category Name
				</p>
				<input
					className="border-2 border-gray-400 w-full rounded-full pl-4 py-1.5 mb-3"
					onChange={ onNameInputChange }
					value={ nameInput } />
				<div>
					<Button primary className="w-24 rounded-lg">Add</Button>
				</div>
			</form>
		</div>
	)
}

export default CategoryForm;