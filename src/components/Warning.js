import { FaCircleExclamation } from "react-icons/fa6";
import "../styles/warning.css";

function Warning({ message })
{
	return (
		<div className="form-warning">
			<FaCircleExclamation />
			{ message }
		</div>
	);
}

export default Warning;