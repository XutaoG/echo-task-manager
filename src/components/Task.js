import { useDispatch } from "react-redux";
import { removeTask } from "../store";
import { changeTask } from "../store";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import { useState } from "react";
import "../styles/task.css";

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
		<div className="task">
			<div className="task-completion">
				<FaCircleCheck />
			</div>
			<div className="task-name">
				Task 1
			</div>
			<div className="task-categories">
				School, Financial
			</div>
			<div className="task-due-date">
				In 4 days (4/29/24)
			</div>
			<div className="task-priority">
				High priority
			</div>
			<div className="task-actions">
				<button>Completed</button>
				<button>Edit</button>
				<button>Delete</button>
			</div>
		</div>
	)
}

export default Task;