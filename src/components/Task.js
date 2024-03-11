import { useDispatch, useSelector } from "react-redux";
import { removeTask, markCompletion } from "../store";
import { FaCircleCheck, FaCircleStop } from "react-icons/fa6";
import { changeViewedTask } from "../store";
import Divider from "./Divider";
import Category from "./Category";
import TaskView from "./TaskView";
import "../styles/task.css";

function Task({ task })
{
	const dispatch = useDispatch();

	const categories = useSelector(state => state.categories);

	const isExpanded = useSelector(state =>
	{
		return state.taskView === task.id;
	});

	const handleCompletionClick = (event) =>
	{
		event.stopPropagation();

		dispatch(markCompletion(task.id));
	};

	const handleViewClick = (event) =>
	{
		event.stopPropagation();

		if (isExpanded)
		{
			dispatch(changeViewedTask(null));
		}
		else
		{
			dispatch(changeViewedTask(task.id));
		}
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

		if (task.completed)
		{
			message = "Completed";
		}
		else if (dayLeft < 0)
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

		if (task.completed)
		{
			return (
				<div className="font-completed">
					{ message }
				</div>
			);
		}
		else if (dayLeft < 0)
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
		// Check if category exists
		const foundCategory = categories.find(tempCategory => tempCategory.id === categoryId);

		if (!foundCategory)
		{
			// const updatedCategories = task.categories.filter(tempCategoryId =>
			// {
			// 	return tempCategoryId !== categoryId;
			// });

			// const updatedTask = {
			// 	...task,
			// 	categories: updatedCategories
			// }

			// dispatch(updateTask(updatedTask));

			return undefined;
		}

		return (
			<Category
				key={ foundCategory.id }
				name={ foundCategory.name }
				color={ foundCategory.color } />
		);
	});

	const renderedTaskView = isExpanded ? <TaskView task={ task } /> : undefined;

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
					<button
						className="task-view-button"
						onClick={ handleViewClick }
					>
						View
					</button>
					<button
						className="task-delete-button"
						onClick={ handleRemoveTask }
					>
						Delete
					</button>
				</div>
			</div>
			{ renderedTaskView }
			<Divider />
		</div>
	)
}

export default Task;