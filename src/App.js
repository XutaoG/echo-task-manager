import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskDisplay from "./components/TaskDisplay";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";

function App()
{
	return (
		<div className="bg-green-100 min-h-screen flex justify-center">
			<div className="w-1/2">
				<TaskForm />
				<CategoryForm />
				<CategoryList />
				<TaskList />
				<TaskDisplay />
			</div>
		</div>
	);
}

export default App;