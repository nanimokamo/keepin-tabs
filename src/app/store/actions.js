import groupBy from 'lodash.groupby';
import { createStructuredSelector } from 'reselect';

import { sortBy } from '../utils.js';
import * as Chrome from '../chrome.js';
import {
  getSelectedTabs,
  getSelectedTabIds,
  getVisibleTabs,
  getVisibleTabIds,
  getHighlightedTabId,
  getMode,
  getQuery,
  getShowBookmarks,
  getIsTabPinned,
} from './selectors.js';

import {
  FETCH_TABS_SUCCESS,
  SET_QUERY,
  SET_MODE,
  SET_HIGHLIGHTED_TAB_ID,
  SET_LIST_VIEW_SUCCESS,
  TOGGLE_TAB_SELECTED,
  DESELECT_TAB,
  DESELECT_ALL_TABS,
  SET_BOOKMARKS_VISIBILITY,
  NEW_FOLDER_CREATED,
  SELECT_TABS,
  SET_DRAGGING,
  IGNORE_EVENTS,
  SET_WINDOWS_VISIBILITY,
} from '../constants.js';

export const closeTabs = () => (dispatch, getState) => {
  const selectedTabIds = getSelectedTabIds(getState());
  if (selectedTabIds.length) selectedTabIds.forEach(Chrome.closeTab);
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

export const toggleTabSelected = (tabId) => ({
  type: TOGGLE_TAB_SELECTED,
  tabId,
});

export const selectAllVisibleTabs = () => (dispatch, getState) => {
  dispatch({
    type: SELECT_TABS,
    ids: getVisibleTabIds(getState()),
  });
};

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

export const toggleListView = () => (dispatch, getState) => {
  dispatch(setListView(getState().listView === 'default' ? 'compact' : 'default'));
}

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
  tabs: tabs.map(tab => {
    return {
      id: tab.id,
      index: tab.index,
      highlighted: tab.highlighted,
      pinned: tab.pinned,
      active: tab.active,
      url: tab.url,
      title: tab.title,
      favIconUrl: tab.favIconUrl,
      status: tab.status,
    };
  }),
});

export const setDragging = (dragging) => ({
  type: SET_DRAGGING,
  dragging,
});

export const toggleWindowsVisibility = () => (dispatch, getState) => dispatch({
  type: SET_WINDOWS_VISIBILITY,
  visible: getState().showWindows ? false : true,
});

export const sortTabs = () => (dispatch, getState) => {
  const tabs = getVisibleTabs(getState());
  if (!tabs.length) return;

  const groupedPinnedTabs = groupBy(tabs, 'pinned');
  const pinnedTabs = groupedPinnedTabs[true] || [];
  const unpinnedTabs = groupedPinnedTabs[false] || [];
  const groupedUnpinnedTabs = unpinnedTabs::sortBy('url');

  [...pinnedTabs, ...groupedUnpinnedTabs]
    .forEach((tab, index) => Chrome.moveTabs([tab.id], index));
  
  return false;
}

export const toggleTabPinned = (id) => (dispatch, getState) => {
  const pinned = getIsTabPinned(id)(getState());
  Chrome.pinTab(id, !pinned);
};

export const fetchTabs = () => (dispatch) => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    dispatch(fetchTabsSuccess(tabs));
  });
};

export const moveSelectedTabsToWindow = (windowId = undefined) => (dispatch, getState) => {
  const tabIds = getSelectedTabIds(getState());
  if (!windowId) {
    Chrome.moveTabsToNewWindow(tabIds);
  } else {
    Chrome.moveTabs(tabIds, undefined, windowId);
  }
};

export const keyPressed = (e) => (dispatch, getState) => {
  const { code } = e;
  if (IGNORE_EVENTS.includes(code)) return;

  const { tabs, highlightedTabId, mode, query, bottomSheetOpen } = createStructuredSelector({
    tabs: getVisibleTabs,
    highlightedTabId: getHighlightedTabId,
    mode: getMode,
    query: getQuery,
    bottomSheetOpen: getShowBookmarks,
  })(getState());

  if (bottomSheetOpen) return;

  switch (code) {
    case 'ArrowUp':
    case 'ArrowDown': {
      e.preventDefault();
      let id = code === 'ArrowUp' ? tabs[tabs.length - 1].id : tabs[0].id;

      if (highlightedTabId !== undefined) {
        const currentIndex = tabs.findIndex(tab => tab.id === highlightedTabId);
        if (code === 'ArrowUp') {
          id = (currentIndex - 1) < 0 ? tabs[tabs.length - 1].id : tabs[currentIndex - 1].id;
        } else {
          id = (currentIndex + 1) > (tabs.length - 1) ? tabs[0].id : tabs[currentIndex + 1].id;
        }
      }

      dispatch(setHighlightedTabId(id));
      break;
    }
    case 'Enter': {
      e.preventDefault();
      if (highlightedTabId) Chrome.goToTab(highlightedTabId);
      break;
    }
    case 'Backspace': {
      if (mode === 'search' && query.length === 0) dispatch(setMode('default'));
      break;
    }
    default: {
      dispatch(setMode('search'));
    }
  } 
};
