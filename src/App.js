import TaskForm from "./components/TaskForm";
import CategoryForm from "./components/CategoryForm";
import Search from "./components/Search";
import TaskList from "./components/TaskList";
import logo from "./asset/logo/logo.png";

function App()
{
	return (
		<div>
			<div className="left-container">
				<div className="title-header">
					<img className="logo" src={ logo } alt="logo" />
				</div>
				<div className="form-wrapper">
					<TaskForm />
					<CategoryForm />
				</div>
			</div>
			<div className="right-container">
				<Search />
				<TaskList />
			</div>
		</div>
	);
}

export default App;