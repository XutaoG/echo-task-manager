import { useState } from "react";
import { FaRegSquare, FaRegSquareCheck } from "react-icons/fa6";

function CategorySelection({ label, onAddCategory, onRemoveCategory })
{
	const [isSelected, setIsSelected] = useState(false);

	const handleClick = () =>
	{
		if (!isSelected)
		{
			// console.log("adding: " + label);
			onAddCategory();
		}
		else
		{
			// console.log("removing: " + label);
			onRemoveCategory();
		}

		setIsSelected(value => !value);
	}

	const icon = isSelected ?
		<FaRegSquareCheck className="text-2xl" /> : <FaRegSquare className="text-2xl" />;

	return (
		<div
			className="h-fit w-fit"
			onClick={ handleClick }>
			<div className="bg-sky-300 px-1.5 py-1 rounded-lg h-fit w-fit flex justify-start items-center">
				<div className="mr-1">
					{ icon }
				</div>
				<p>
					{ label }
				</p>
			</div>
		</div>
	);
}

export default CategorySelection;