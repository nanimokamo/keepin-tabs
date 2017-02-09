import React from 'react';

import IconButton from '../IconButton';

const HeaderSelect = ({ cancelSelect, numSelectedTabs, showBookmarks, sortTabs, closeTabs }) => {
	return (
		<section className="Header--select">
			<IconButton
				className="main-action"
				icon="back"
				onClick={cancelSelect}
				name="Back"
			/>
			<h1>{numSelectedTabs} selected</h1>

			<div className="Header-actions">
				<IconButton
					onClick={showBookmarks}
					icon="bookmark"
					title="Bookmark"
				/>
				<IconButton
					onClick={sortTabs}
					icon="sort"
					title="Sort"
				/>
				<IconButton
					onClick={closeTabs}
					icon="close"
					title="Close"
				/>
			</div>
		</section>
	);
};

export default HeaderSelect;
