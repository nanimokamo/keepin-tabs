import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
	getNumTabs,
	getMode,
	getQuery,
	getListView,
	getNumSelectedTabs
} from '../../selectors.js'

import {
	setQuery,
	setMode,
	sortTabs,
	toggleListView,
	selectAllVisibleTabs,
	deselectAllTabs,
	closeTabs,
	setBookmarksVisibility,
	toggleWindowsVisibility,
} from '../../actions.js'

import HeaderDefault from './default.js';
import HeaderSearch from './search.js';
import HeaderSelect from './select.js';

const Header = ({
	mode,
	numTabs,
	toggleView,
	listView,
	query,
	setQuery,
	selectAll,
	setModeSearch,
	clearQuery,
	sortTabs,
	cancelSearch,
	cancelSelect,
	numSelectedTabs,
	setModeDefault,
	showBookmarks,
	toggleWindowsVisibility,
}) => {
	return (
		<header className="Header" data-mode={mode}>
			{mode === 'default' ?
				<HeaderDefault
					numTabs={numTabs}
					toggleView={toggleView}
					listView={listView}
					sortTabs={sortTabs}
					toggleWindowsVisibility={toggleWindowsVisibility}
					setModeSearch={setModeSearch}
				/>
			: null}
			{mode === 'search' ?
				<HeaderSearch
					query={query}
					setQuery={setQuery}
					selectAll={selectAll}
					clearQuery={clearQuery}
					cancelSearch={cancelSearch}
				/>
			: null}
			{mode === 'select' ?
				<HeaderSelect
					cancelSelect={cancelSelect}
					numSelectedTabs={numSelectedTabs}
					showBookmarks={showBookmarks}
					sortTabs={sortTabs}
					closeTabs={closeTabs}
				/>
			: null}
		</header>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setQuery(e) {
		dispatch(setQuery(e.target.value));
	},
	sortTabs() {
		dispatch(sortTabs());
	},
	setModeSearch() {
		dispatch(setMode('search'));
	},
	setModeDefault() {
		dispatch(setMode('default'));
	},
	selectAll() {
		dispatch(selectAllVisibleTabs());
	},
	clearQuery() {
		dispatch(setQuery(''));
	},
	cancelSearch() {
		dispatch(setMode('default'));
		dispatch(setQuery(''));
	},
	toggleView() {
		dispatch(toggleListView());
	},
	toggleWindowsVisibility() {
		dispatch(toggleWindowsVisibility());
	},
	showBookmarks() {
		dispatch(setBookmarksVisibility(true));
	},
	cancelSelect() {
		dispatch(deselectAllTabs());
	},
});

const mapStateToProps = createStructuredSelector({
	numTabs: getNumTabs,
	mode: getMode,
	query: getQuery,
	listView: getListView,
	numSelectedTabs: getNumSelectedTabs,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
