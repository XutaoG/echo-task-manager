import { useSelector } from "react-redux";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { removeCategory } from "../store";

function CategoryList()
{
	const dispatch = useDispatch();

	const categories = useSelector(state => state.categories);

	const handleRemoveCategory = (id) =>
	{
		dispatch(removeCategory(id));
	};

	const renderedCategories = categories.map((category) =>
	{
		return (
			<div key={ category.id }>
				<p>
					{ category.name }
				</p>
				<Button secondary onClick={ () => handleRemoveCategory(category.id) }>
					Remove Category
				</Button>
			</div>
		);
	});

	return (
		<div className="bg-white rounded-xl p-4 mx-12 mt-12">
			<p className="text-3xl">
				Categories
			</p>
			{ renderedCategories }
		</div>
	);
}

export default CategoryList;