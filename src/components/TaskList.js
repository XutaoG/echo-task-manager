import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import Task from "./Task";
import "../styles/task-list.css";

function TaskList()
{
	const memoizedTasks = createSelector(
		state => state.tasks,
		state => state.search,
		(tasks, searchTerm) =>
		{
			const updatedTasks = tasks.filter(task =>
			{
				return task.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
			});

			return updatedTasks.sort(taskSort);
		}
	);

	const taskSort = (task1, task2) =>
	{
		if (!task1.completed && task2.completed)
		{
			return -1;
		}
		else if (task1.completed && !task2.completed)
		{
			return 1;
		}
		else
		{
			return new Date(task1.dueDate).getTime() - new Date(task2.dueDate);
		}
	};

	const tasks = useSelector(memoizedTasks);

	const renderedTasks = tasks.map((task) =>
	{
		return (
			<Task key={ task.id } task={ task } />
		);
	});

	return (
		<div className="background-container">
			<div className="list-container">
				<div className="all-task-header">All Tasks</div>
				{ renderedTasks }
			</div>
		</div>
	);
}

export default TaskList;