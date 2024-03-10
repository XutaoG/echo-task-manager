import { useSelector } from "react-redux";
import Task from "./Task";
import "../styles/task-list.css";

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
		<div className="background-container">
			<div className="list-container">
				<div className="all-task-header">All Tasks</div>
				{ renderedTasks }
			</div>
		</div>
	);
}

export default TaskList;