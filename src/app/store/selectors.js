import { createSelector } from 'reselect';
import { sortBy } from '../utils.js';

export const getTabs = (state) => state.tabs;
export const getWindows = (state) => state.windows;
export const getQuery = (state) => state.query.toLowerCase();
export const getHighlightedTabId = (state) => state.highlightedTabId;
export const getListView = (state) => state.listView;
export const getSelectedTabIds = (state) => state.selectedTabIds;
export const getIsDragging = (state) => state.isDragging;
export const getMode = (state) => state.selectedTabIds.length ? 'select' : state.mode;
export const getShowBookmarks = (state) => state.showBookmarks;
export const getShowWindows = (state) => state.showWindows;

export const getNumWindows = createSelector(
  [getWindows],
  (windows) => windows.length,
);

export const getIsTabPinned = (id) => createSelector(
  [getTabs],
  (tabs) => tabs.some(tab => tab.id === id && tab.pinned),
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
  (tabs) => tabs.length ? tabs::sortBy('index') : tabs,
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

export const getPinnedVisibleTabIds = createSelector(
  [getPinnedVisibleTabs],
  (tabs) => tabs.map(tab => tab.id),
);

export const getUnpinnedVisibleTabIds = createSelector(
  [getUnpinnedVisibleTabs],
  (tabs) => tabs.map(tab => tab.id),
);

export const getSelectedPinnedVisibleTabsIndexes = createSelector(
  [getPinnedVisibleTabIds, getSelectedTabIds],
  (pinnedVisibleTabIds, selectedTabIds) => pinnedVisibleTabIds.reduce((state, id, i) => {
    return selectedTabIds.includes(id)
      ? [...state, i]
      : state;
  }, []),
);

export const getSelectedUnpinnedVisibleTabsIndexes = createSelector(
  [getUnpinnedVisibleTabIds, getSelectedTabIds],
  (unpinnedVisibleTabIds, selectedTabIds) => unpinnedVisibleTabIds.reduce((state, id, i) => {
    return selectedTabIds.includes(id)
      ? [...state, i]
      : state;
  }, []),
);

export const getVisibleTabIds = createSelector(
  [getVisibleTabs],
  (visibleTabs) => visibleTabs.map(tab => tab.id),
);

export const getNumTabs = createSelector(
  getTabs,
  (tabs) => tabs.length,
);
