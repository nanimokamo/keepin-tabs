import React from 'react';

const List = ({ children, className, ...props }) => {
	return (
		<div {...props} className={`List ${className ? className : ''}`}>{children}</div>
	);
};

List.propTypes = {
	// children: React.PropTypes.func,
	className: React.PropTypes.string,
};

export default List;
