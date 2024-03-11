import { useDispatch, useSelector } from "react-redux";
import { changeSearchTerm } from "../store";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "../styles/search-bar.css";

function Search()
{
	const dispatch = useDispatch();
	const searchTerm = useSelector(state => state.search);

	const handleSearchTermChange = (event) =>
	{
		dispatch(changeSearchTerm(event.target.value));
	}

	return (
		<div className="search-bar">
			<form className="search-input">
				<div className="search-icon">
					<FaMagnifyingGlass />
				</div>
				<input value={ searchTerm } placeholder="Search" onChange={ handleSearchTermChange } />
				<button>Search</button>
			</form>
			<div className="credit">
				Task Manager Made By Xutao Gao
			</div>
		</div>
	);
}

export default Search;