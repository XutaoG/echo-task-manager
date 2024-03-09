import Button from "./Button";
import { useDispatch } from "react-redux";
import { removeTask } from "../store";
import { changeTask } from "../store";
import { FaRegTrashCan, FaPen, FaEye } from "react-icons/fa6";
import { useState } from "react";

function Task({ task })
{
	const dispatch = useDispatch();

	const [expanded, setExpanded] = useState(false);

	const handleViewClick = (event) =>
	{
		event.stopPropagation();

		dispatch(changeTask(task.id));
	};

	const handleEditClick = (event) =>
	{
		event.stopPropagation();
	};

	const handleRemoveTask = (event) =>
	{
		event.stopPropagation();

		dispatch(removeTask(task.id));
	};

	const handleExpand = () =>
	{
		setExpanded((value) =>
		{
			return !value;
		});
	};

	const expandedContent = expanded ? (
		<div className="inline-block m-4">
			<p className="text-lg font-medium">
				Description
			</p>
			<p>
				{ task.description }
			</p>
		</div>
	) : undefined;

	return (
		<div className="bg-gray-400 rounded-xl mt-4">
			<div
				className="h-20 bg-gray-200 rounded-xl p-4 flex justify-between items-center"
				onClick={ handleExpand }
			>
				<div className="ml-1.5">
					<p className="text-2xl font-medium truncate w-40">
						{ task.name }
					</p>
				</div>
				<div>

					<Button
						secondary
						className="rounded-l-lg hover:bg-green-500 w-12 h-12"
						onClick={ handleViewClick }
					>
						<FaEye className="m-auto" />
					</Button>

					<Button
						secondary
						className="border-x-2 border-gray-900 hover:bg-stone-400 w-12 h-12"
						onClick={ handleEditClick }
					>
						<FaPen className="m-auto" />
					</Button>

					<Button
						secondary
						className="rounded-r-lg hover:bg-red-600 w-12 h-12"
						onClick={ handleRemoveTask }
					>
						<FaRegTrashCan className="m-auto" />
					</Button>

				</div>
			</div>
			{ expandedContent }
		</div>
	)
}

export default Task;