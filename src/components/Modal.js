import { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ children, actionBar })
{
	useEffect(() =>
	{
		document.body.classList.add("overflow-hidden");

		return () =>
		{
			document.body.classList.remove("overflow-hidden");
		};
	}, []);


	return ReactDOM.createPortal(
		<div>
			<div
				className="fixed inset-0 bg-gray-300 opacity-80"
				onClick={ () => { } }
			>
			</div>
			<div className="fixed inset-40 p-10 bg-white">
				<div className="flex flex-col justify-between h-full">
					{ children }
					<div className="flex justify-end">
						{ actionBar }
					</div>
				</div>
			</div>
		</div>,
		document.getElementById("modal-container")
	)
}

export default Modal;