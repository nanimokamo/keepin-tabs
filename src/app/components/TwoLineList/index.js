import React from 'react';

const TwoLineList = ({ children, className, view = 'default', ...props }) => {
	return (
		<div
			{...props}
			className={`TwoLineList ${className ? className : ''}`}
			data-view={view}
		>
			{children}
		</div>
	);
};

TwoLineList.propTypes = {
	// children: React.PropTypes.func,
	className: React.PropTypes.string,
	view: React.PropTypes.string,
};

export default TwoLineList;