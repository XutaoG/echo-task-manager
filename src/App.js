import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskDisplay from "./components/TaskDisplay";

function App()
{
	return (
		<div>
			<TaskForm />
			<hr />
			<TaskList />
			<hr />
			<TaskDisplay />
		</div>
	);
}

export default App;