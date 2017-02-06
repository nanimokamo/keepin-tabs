import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store.js';
import { fetchTabs, setListViewSuccess, deselectTab } from './actions.js';

const store = configureStore();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);

store.dispatch(fetchTabs());
chrome.tabs.onCreated.addListener(() => store.dispatch(fetchTabs()));
chrome.tabs.onUpdated.addListener(() => store.dispatch(fetchTabs()));
chrome.tabs.onMoved.addListener(() => store.dispatch(fetchTabs()));
chrome.tabs.onRemoved.addListener((tabId) => {
	store.dispatch(deselectTab(tabId));
	store.dispatch(fetchTabs());
});

chrome.storage.sync.get('listView', ({ listView }) => {
	if (typeof listView === 'string') store.dispatch(setListViewSuccess(listView));
});
