import { useDispatch, useSelector } from "react-redux";
import { removeTask, markCompletion } from "../store";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import { useState } from "react";
import Divider from "./Divider";
import Category from "./Category";
import "../styles/task.css";

function Task({ task })
{
	const dispatch = useDispatch();

	const categories = useSelector(state => state.categories);

	const [expanded, setExpanded] = useState(false);

	const handleCompletionClick = (event) =>
	{
		event.stopPropagation();

		dispatch(markCompletion(task.id));
	};

	const handleEditClick = (event) =>
	{

	};

	const handleRemoveTask = (event) =>
	{
		event.stopPropagation();

		dispatch(removeTask(task.id));
	};

	const renderedCompletionIcon = task.completed ? <FaCircleCheck /> : <FaCircleStop />;

	const renderedDueDate = () =>
	{
		let message = "";

		const dayLeft = Math.floor((new Date(task.dueDate).getTime() -
			new Date(new Date().toISOString().slice(0, 10)).getTime()) / 86400000);

		if (dayLeft < 0)
		{
			message = "Past due";
		}
		else if (dayLeft === 0)
		{
			message = "Due today";
		}
		else if (dayLeft === 1)
		{
			message = "Due tomorrow";
		}
		else
		{
			message = `Due in ${dayLeft} days`;
		}

		if (dayLeft < 0)
		{
			return (
				<div className="font-past-due">
					{ message }
				</div>
			);
		}
		else if (dayLeft === 0 || dayLeft === 1)
		{
			return (
				<div className="font-due-soon">
					{ message }
				</div>
			);
		}
		else
		{
			return (
				<div className="font-due-in-days">
					{ message }
				</div>
			);
		}
	};

	const renderedPriority = () =>
	{
		if (task.priority === "none")
		{
			return "No priority"
		}
		else if (task.priority === "low")
		{
			return "Low priority"
		}
		else if (task.priority === "medium")
		{
			return "Medium priority"
		}
		else if (task.priority === "high")
		{
			return "High priority"
		}
	};

	const renderedCategories = task.categories.map(categoryId =>
	{
		const foundCategory = categories.find(tempCategory => tempCategory.id === categoryId);

		return (
			<Category
				key={ foundCategory.id }
				name={ foundCategory.name }
				color={ foundCategory.color } />
		);
	});

	const completionMessage = task.completed ? "Unmark As Complete" : "Mark As Complete";

	return (
		<div>
			<div className="task">
				<div className="task-completion">
					{ renderedCompletionIcon }
				</div>
				<div className="task-name">
					{ task.name }
				</div>
				<div className="task-categories">
					{ renderedCategories }
				</div>
				<div className="task-due-date">
					{ renderedDueDate() }
				</div>
				<div className="task-priority">
					{ renderedPriority() }
				</div>
				<div className="task-actions">
					<button
						className="task-complete-button"
						onClick={ handleCompletionClick }
					>
						{ completionMessage }
					</button>
					<button className="task-edit-button">Edit</button>
					<button
						className="task-delete-button"
						onClick={ handleRemoveTask }
					>
						Delete
					</button>
				</div>
			</div>
			<Divider />
		</div>
	)
}

export default Task;