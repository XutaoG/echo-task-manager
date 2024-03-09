import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

function TaskDisplay()
{
	const memoizedTask = createSelector(
		state => state.tasks,
		state => state.selectedTask,
		(tasks, selectedTask) =>
		{
			for (let task of tasks)
			{
				if (task.id === selectedTask)
				{
					return task;
				}
			}
			return undefined;
		}
	);

	const task = useSelector(memoizedTask);

	return (
		<div className="bg-white rounded-xl p-4 mx-12 mt-12">
			<p className="text-3xl mb-3">
				View Task
			</p>

			<p className="text-lg font-medium mb-1.5">
				Name
			</p>
			<p className="mb-3">{ task?.name }</p>

			<p className="text-lg font-medium mb-1.5">
				Description
			</p>
			<p className="mb-3">{ task?.description }</p>

			<p className="text-lg font-medium mb-1.5">
				Categories:
			</p>
			<p className="mb-3">{ task?.categories.length }</p>
		</div>
	);
}

export default TaskDisplay;