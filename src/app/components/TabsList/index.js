import React from 'react';

const TabsList = ({ view, children }) => {
	return (
		<ul className={`TabsList TabsList--view-${view}`}>
			{children}
		</ul>
	);
};

export default TabsList;
