import React from 'react';

const List = ({ children, className, size, ...props }) => {
	return (
		<div
			{...props}
			className={`List ${className ? className : ''}`}
			data-size={size || 'normal'}
		>{children}</div>
	);
};

List.propTypes = {
	// children: React.PropTypes.func,
	className: React.PropTypes.string,
};

export default List;
