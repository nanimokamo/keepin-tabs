import groupBy from 'lodash.groupby';
import { sortBy, moveTab } from './utils.js';

import {
	FETCH_TABS_SUCCESS,
	SET_QUERY,
	SET_MODE,
	SET_HIGHLIGHTED_TAB_ID,
	SET_LIST_VIEW_SUCCESS,
} from './constants.js';

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
	const { tabs } = getState();
	if (!tabs.length) return;

	const groupedPinnedTabs = groupBy(tabs, 'pinned');
	const pinnedTabs = groupedPinnedTabs[true];
	const unpinnedTabs = groupedPinnedTabs[false];
	const groupedUnpinnedTabs = sortBy(unpinnedTabs, 'url');

	pinnedTabs.concat(groupedUnpinnedTabs).forEach((tab) => moveTab(id, i));
}

export const fetchTabs = () => (dispatch) => {
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
		dispatch(fetchTabsSuccess(tabs));
	});
};