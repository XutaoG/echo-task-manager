import classnames from "classnames";
import "../styles/category.css";

function Category({ name, color })
{
	const classes = classnames("category", {
		"red-category": color === "red",
		"green-category": color === "green",
		"blue-category": color === "blue",
		"orange-category": color === "orange",
		"purple-category": color === "purple",
		"yellow-category": color === "yellow",
		"gray-category": color === "gray",
	});

	return (
		<div className={ classes }>
			{ name }
		</div>
	);
}

export default Category;