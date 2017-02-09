import { createSelector } from 'reselect';
import { sortBy } from './utils.js';

export const getTabs = (state) => state.tabs;
export const getQuery = (state) => state.query.toLowerCase();
export const getHighlightedTabId = (state) => state.highlightedTabId;
export const getListView = (state) => state.listView;
export const getSelectedTabIds = (state) => state.selectedTabIds;
export const getIsDragging = (state) => state.isDragging;
export const getWindowsVisible = (state) => state.windowsVisible;

export const getMode = (state) => state.selectedTabIds.length ? 'select' : state.mode;

export const getShowBookmarks = (state) => state.showBookmarks;

export const getWindowsVisibility = createSelector(
	[getIsDragging, getWindowsVisible],
	(isDragging, windowsVisible) => isDragging || windowsVisible,
);

export const getNumSelectedTabs = createSelector(
	getSelectedTabIds,
	(tabIds) => tabIds.length,
);

export const getSelectedTabs = createSelector(
	[getTabs, getSelectedTabIds],
	(tabs, selectedTabIds) => tabs.filter(tab => selectedTabIds.indexOf(tab.id) !== -1),
);

export const getSortedTabs = createSelector(
	getTabs,
	(tabs) => tabs.length ? sortBy(tabs, 'index') : tabs,
);

export const getVisibleTabs = createSelector(
	[getSortedTabs, getQuery],
	(sortedTabs, query) => {
		if (query.length && sortedTabs.length) {
			return sortedTabs
				.filter(tab => {
					if (
						tab.title.toLowerCase().includes(query.toLowerCase()) ||
						tab.url.toLowerCase().includes(query.toLowerCase())
					) return true;
				});
		}

		return sortedTabs;
	},
);

export const getPinnedVisibleTabs = createSelector(
	[getVisibleTabs],
	(tabs) => tabs.filter(t => t.pinned),
);

export const getUnpinnedVisibleTabs = createSelector(
	[getVisibleTabs],
	(tabs) => tabs.filter(t => !t.pinned),
);

export const getVisibleTabIds = createSelector(
	[getVisibleTabs],
	(visibleTabs) => visibleTabs.map(tab => tab.id),
);

export const getNumTabs = createSelector(
	getTabs,
	(tabs) => tabs.length,
);
