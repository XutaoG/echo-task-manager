import { useState } from "react";
import Category from "./Category";
import { FaCirclePlus, FaCircleCheck } from "react-icons/fa6";

function CategoryWidget({ category, initialState, onAdd, onRemove })
{
	const [hasAdded, setHasAdded] = useState(initialState);

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

export default CategoryWidget;