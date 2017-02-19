import React from 'react';

const List = ({ children, className, size, ...props }) => {
	return (
		<ul
			{...props}
			className={`List ${className ? className : ''}`}
			data-size={size || 'normal'}
		>
			{children}
		</ul>
	);
};

List.propTypes = {
	// children: React.PropTypes.func,
	size: React.PropTypes.string,
	className: React.PropTypes.string,
};

export default List;
