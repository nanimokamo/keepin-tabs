import { combineReducers } from 'redux';

import {
	FETCH_TABS_SUCCESS,
	SET_QUERY,
	SET_MODE,
	SET_HIGHLIGHTED_TAB_ID,
	SET_LIST_VIEW_SUCCESS,
} from './constants.js';

const tabs = (state = [], action) => {
	switch (action.type) {
		case FETCH_TABS_SUCCESS:
			return action.tabs;
		default:
			return state;
	}
};

const query = (state = '', action) => {
	if (action.type !== SET_QUERY) return state;
	return action.query;
};

const mode = (state = 'default', action) => {
	if (action.type !== SET_MODE) return state;
	return action.mode;
};

const highlightedTabId = (state = null, action) => {
	if (action.type !== SET_HIGHLIGHTED_TAB_ID) return state;
	return action.highlightedTabId;
};

const listView = (state = 'default', action) => {
	if (action.type !== SET_LIST_VIEW_SUCCESS) return state;
	return action.listView;
};

const createReducer = () => {
	return combineReducers({
		tabs,
		query,
		mode,
		highlightedTabId,
		listView,
	});
};

export default createReducer;
