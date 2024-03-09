import classnames from "classnames";

function Button({ primary, secondary, children, className, ...rest })
{
	const classes = classnames(
		"px-4 py-1.5 items-center",
		className,
		{
			"bg-sky-500 text-white": primary,
			"bg-gray-500 text-white": secondary
		}
	);

	return (
		<button className={ classes } { ...rest }>
			<div>
				{ children }
			</div>
		</button >
	)
}

export default Button;