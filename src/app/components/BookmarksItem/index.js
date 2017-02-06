import React from 'react';

import Icon from '../Icon';

const BookmarksItem = ({ id, title, goToFolder, addToFolder }) => {
	return (
		<li
			className="Bookmarks-item"
			key={id}
			onClick={(e) => addToFolder(id)}
		>
			<Icon name="folder" />
			<div className="Bookmarks-itemTitle">
				{title}
			</div>
			<Icon
				name="right-arrow"
				onClick={(e) => {
					e.stopPropagation();
					goToFolder(id);
				}}
			/>
		</li>
	);
};

export default BookmarksItem;
