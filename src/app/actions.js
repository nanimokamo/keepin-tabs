import groupBy from 'lodash.groupby';
import { sortBy, moveTab, closeTab } from './utils.js';
import { getSelectedTabs, getSelectedTabIds, getVisibleTabs } from './selectors.js';

import {
	FETCH_TABS_SUCCESS,
	SET_QUERY,
	SET_MODE,
	SET_HIGHLIGHTED_TAB_ID,
	SET_LIST_VIEW_SUCCESS,
	SELECT_TAB,
	DESELECT_TAB,
	DESELECT_ALL_TABS,
	SET_BOOKMARKS_VISIBILITY,
	NEW_FOLDER_CREATED,
} from './constants.js';

export const closeTabs = () => (dispatch, getState) => {
	const selectedTabIds = getSelectedTabIds(getState());
	if (selectedTabIds.length) selectedTabIds.forEach(closeTab);
	return false;
};

export const addSelectedTabsToFolder = (id) => (dispatch, getState) => {
	const selectedTabs = getSelectedTabs(getState());

	selectedTabs.forEach(tab => {
		chrome.bookmarks.create({
			parentId: id,
			title: tab.title,
			url: tab.url,
		});
	});
};

export const createNewFolder = (parentId, title) => {
	chrome.bookmarks.create({
		parentId,
		title,
	});

	return {
		type: NEW_FOLDER_CREATED,
	};
};

export const setBookmarksVisibility = (visible) => ({
	type: SET_BOOKMARKS_VISIBILITY,
	visible,
});

export const deselectAllTabs = () => ({
	type: DESELECT_ALL_TABS,
});

export const selectTab = (tabId) => ({
	type: SELECT_TAB,
	tabId,
});

export const deselectTab = (tabId) => ({
	type: DESELECT_TAB,
	tabId,
});

export const setQuery = (query = '') => ({
	type: SET_QUERY,
	query,
});

export const setListViewSuccess = (listView) => ({
	type: SET_LIST_VIEW_SUCCESS,
	listView,
});

export const setListView = (listView) => (dispatch) => {
	chrome.storage.sync.set({ listView }, () => {
		dispatch(setListViewSuccess(listView));
	});
};

export const setHighlightedTabId = (highlightedTabId) => ({
	type: SET_HIGHLIGHTED_TAB_ID,
	highlightedTabId,
});

export const setMode = (mode = 'default') => ({
	type: SET_MODE,
	mode,
});

export const fetchTabsSuccess = (tabs) => ({
	type: FETCH_TABS_SUCCESS,
	tabs,
});

export const sortTabs = () => (dispatch, getState) => {
	const tabs = getVisibleTabs(getState());
	if (!tabs.length) return;

	const groupedPinnedTabs = groupBy(tabs, 'pinned');
	const pinnedTabs = groupedPinnedTabs[true] || [];
	const unpinnedTabs = groupedPinnedTabs[false] || [];
	const groupedUnpinnedTabs = sortBy(unpinnedTabs, 'url');

	pinnedTabs.concat(groupedUnpinnedTabs).forEach((tab, i) => moveTab(tab.id, i));
	return false;
}

export const fetchTabs = () => (dispatch) => {
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
		dispatch(fetchTabsSuccess(tabs));
	});
};
