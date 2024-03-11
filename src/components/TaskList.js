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
			return tasks.filter(task =>
			{
				return task.name.toLowerCase().includes(searchTerm.toLowerCase().trim());				
			});
		}
	);

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