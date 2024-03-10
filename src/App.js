import TaskForm from "./components/TaskForm";
import CategoryForm from "./components/CategoryForm";
import Search from "./components/Search";
import { FaClipboardList } from "react-icons/fa6";
import TaskList from "./components/TaskList";

function App()
{
	return (
		<div>
			<div className="left-container">
				<div className="title-header">
					<FaClipboardList />
					Echo
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