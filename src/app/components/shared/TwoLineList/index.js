import React from 'react';

const TwoLineList = ({ children, className, view = 'default', ...props }) => {
	return (
		<ul
			{...props}
			className={`TwoLineList ${className ? className : ''}`}
			data-view={view}
		>
			{children}
		</ul>
	);
};

TwoLineList.propTypes = {
	// children: React.PropTypes.func,
	className: React.PropTypes.string,
	view: React.PropTypes.string,
};

export default TwoLineList;
