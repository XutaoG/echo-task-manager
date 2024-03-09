import { useSelector } from "react-redux";
import Task from "./Task";

function TaskList()
{
	const tasks = useSelector(state => state.tasks);

	const renderedTasks = tasks.map((task) =>
	{
		return (
			<Task key={ task.id } task={ task } />
		);
	});

	return (
		<div className="bg-white rounded-xl p-4 mx-12 mt-12">
			<p className="text-3xl">
				Tasks
			</p>
			{ renderedTasks }
		</div>
	);
}

export default TaskList;