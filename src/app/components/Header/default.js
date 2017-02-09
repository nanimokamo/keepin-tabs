import React from 'react';

import IconButton from '../IconButton';

const HeaderDefault = ({ numTabs, toggleView, listView, setListView, sortTabs, setModeSearch, toggleWindowsVisibility }) => {
	return (
		<section className="Header--default">
			<h1 onClick={toggleWindowsVisibility}>{numTabs} tabs</h1>
			<div className="Header-actions">
				<IconButton
					onClick={toggleView}
					title={listView === 'default' ? 'Compact view' : 'Expanded view'}
					icon={listView === 'default' ? 'compact' : 'default'}
				/>
				<IconButton
					onClick={sortTabs}
					title="Sort"
					icon="sort"
				/>
				<IconButton
					onClick={setModeSearch}
					title="Search"
					icon="search"
				/>
			</div>
		</section>
	);
};

export default HeaderDefault;
