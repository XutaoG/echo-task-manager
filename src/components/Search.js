import "../styles/search-bar.css";
import { FaMagnifyingGlass } from "react-icons/fa6";

function Search()
{
	return (
		<div className="search-bar">
			<div className="search-icon">
				<FaMagnifyingGlass />
			</div>
			<form className="search-input">
				<input placeholder="Search" />
			</form>
			<div className="credit">
				Made By Xutao Gao
			</div>
		</div>
	);
}

export default Search;