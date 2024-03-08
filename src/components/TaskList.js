import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "../store";

function TaskList()
{
	const dispatch = useDispatch();

	const tasks = useSelector(state => state.tasks);

	const onRemoveTask = (id) =>
	{
		dispatch(removeTask(id));
	};

	const renderedTasks = tasks.map((task) =>
	{
		return (
			<div key={ task.id }>
				{ task.name } | { task.description }
				<button onClick={ () => onRemoveTask(task.id) }>Remove</button>
			</div>
		)
	});

	return (
		<div>
			{ renderedTasks }
		</div>
	);
}

export default TaskList;