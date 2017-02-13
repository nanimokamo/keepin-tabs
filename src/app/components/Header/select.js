import React from 'react';

import IconButton from '../IconButton';

const HeaderSelect = ({ cancelSelect, numSelectedTabs, showBookmarks, sortTabs, closeTabs, showWindows }) => {
	return (
		<section className="Header-section Header--select">
			<div className="Header-mainAction">
				<IconButton
					icon="back"
					onClick={cancelSelect}
					name="Back"
				/>
			</div>
			
			<div className="Header-title">
				<h1>{numSelectedTabs} selected</h1>
			</div>

			<div className="Header-actions">
				<IconButton
					onClick={showWindows}
					icon="move-to-window"
					title="Move to window"
				/>
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

HeaderSelect.propTypes = {
	cancelSelect: React.PropTypes.func,
	numSelectedTabs: React.PropTypes.number,
	showBookmarks: React.PropTypes.func,
	showWindows: React.PropTypes.func,
	sortTabs: React.PropTypes.func,
	closeTabs: React.PropTypes.func,
};

export default HeaderSelect;
