import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, removeCategory } from "../store";
import { nanoid } from "@reduxjs/toolkit";
import { FaCirclePlus, FaCircleXmark } from "react-icons/fa6";
import Category from "./Category";
import Warning from "./Warning";
import "../styles/category-form.css";

function CategoryForm()
{
	const colors = [
		"red",
		"green",
		"blue",
		"orange",
		"purple",
		"yellow",
		"gray"
	];

	const warningMessages = {
		emptyName: "Name cannot be empty",
		maxLength: "Name cannot be longer than 20 characters",
		duplicateName: "Category name already exists"
	};

	const dispatch = useDispatch();

	const categories = useSelector(state => state.categories);

	// Tracks category name input
	const [nameInput, setNameInput] = useState("");

	// Tracks category color input
	// Randomly selects a color as the first color
	const [colorInput, setColorInput] = useState(colors[Math.floor(Math.random() * colors.length)]);

	// Tracks warnings
	const [warnings, setWarnings] = useState([]);

	const handleNameInputChange = (event) =>
	{
		setWarnings([]);

		setNameInput(event.target.value);
	};

	const handleColorInputChange = (event) =>
	{
		setColorInput(event.target.value);
	};

	// Adds new category
	const handleAddCategory = () =>
	{
		// Tracks if 1 or more warning is generated
		let hasWarning = false;

		// Check if name is empty
		if (nameInput.trim() === "")
		{
			setWarnings([...warnings, "emptyName"]);
			hasWarning = true;
		}

		// Check if name is at max length
		if (nameInput.trim().length > 20)
		{
			setWarnings([...warnings, "maxLength"]);
			hasWarning = true;
		}

		// Check if duplicate name exists
		for (let category of categories)
		{
			if (category.name === nameInput.trim())
			{
				setWarnings([...warnings, "duplicateName"]);
				hasWarning = true;
				break;
			}
		}

		if (hasWarning)
		{
			return;
		}

		const category = {
			id: nanoid(),
			name: nameInput.trim(),
			color: colorInput
		};

		setNameInput("");
		dispatch(addCategory(category));
	};

	// Remove a category
	const handleRemoveCategory = (categoryId) =>
	{
		dispatch(removeCategory(categoryId));
	}

	const renderedCategories = categories.map((category) =>
	{
		return (
			<CategoryWidget
				key={ category.id }
				category={ category }
				onRemove={ handleRemoveCategory } />
		);
	});

	const renderedColorSelection = colors.map((color) =>
	{
		return (
			<option key={ color } value={ color }>
				{ color }
			</option>
		);
	});

	const renderedWarnings = warnings.map(warning =>
	{
		return (
			<Warning key={ warningMessages[warning] } message={ warningMessages[warning] } />
		)
	});

	return (
		<div className="category-form">
			<div className="category-list">
				{ renderedCategories }
			</div>
			{ renderedWarnings }
			<div className="category-input">
				<input value={ nameInput } onChange={ handleNameInputChange } placeholder="New Category" />
				<select onChange={ handleColorInputChange } value={ colorInput }>
					{ renderedColorSelection }
				</select>
				<div className="category-add-wrapper" onClick={ handleAddCategory }>
					<FaCirclePlus />
				</div>
			</div>
		</div>
	);
}

function CategoryWidget({ category, onRemove })
{
	const [showRemoveIcon, setShowRemoveIcon] = useState(false);

	const handleMouseEnter = () =>
	{
		setShowRemoveIcon(true);
	}

	const handleMouseLeave = () =>
	{
		setShowRemoveIcon(false);
	}

	const renderedRemoveIcon = showRemoveIcon ? (
		<div
			className="category-remove-wrapper"
			onClick={ () => onRemove(category.id) }
		>
			<FaCircleXmark />
		</div>
	) : undefined;

	return (
		<div
			className="category-display-wrapper"
			onMouseEnter={ handleMouseEnter }
			onMouseLeave={ handleMouseLeave }
		>
			{ renderedRemoveIcon }
			<Category name={ category.name } color={ category.color } />
		</div>
	);
}

export default CategoryForm;