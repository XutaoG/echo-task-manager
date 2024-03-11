import "../styles/task-view.css";

function TaskView({ task })
{
	// const handleNameInputChange = (event) =>
	// {

	// };

	// const handleDescriptionInputChange = (event) =>
	// {

	// };

	// const handlePriorityInputChange = (event) =>
	// {

	// };

	return (
		<div className="task-view-container">
			<form>
				<div className="task-view-inputs">
					<div className="task-view-name">
						<p>Name:</p>
						<input />
					</div>
					<div className="task-view-description">
						<p>Description:</p>
						<input />
					</div>
					<div className="task-view-priority">
						<p>Priority:</p>
						<select>
							<option value="none">None</option>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>
					<div className="task-view-date">
						<p>Due Date:</p>
						<input type="date" onKeyDown={ e => e.preventDefault() } />
					</div>
					<div className="task-view-categories">
						<p>Category:</p>
						<div className="task-view-category-list">
							{/* { renderedCategories } */ }
						</div>
					</div>
				</div>
				<div className="task-view-button-wrapper">
					<button className="task-view-add-button">
						Update
					</button>
				</div>
			</form>
		</div>
	)
}

export default TaskView;