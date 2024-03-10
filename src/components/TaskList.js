import { useSelector } from "react-redux";
import Task from "./Task";



import "../styles/task-list.css";
import Divider from "./Divider";

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
					<Task />
					<Divider />
					<Task />
					<Divider />
					<Task />
					<Divider />
					<Task />
					<Divider />
					<Task />
					<Divider />
					<Task />
					<Divider />
			</div>
		</div>
	);
}

export default TaskList;