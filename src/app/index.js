import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import configureStore from './store';
import { fetchTabs, setListViewSuccess, deselectTab, fetchWindows } from './store/actions.js';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

// TABS
store.dispatch(fetchTabs());
chrome.tabs.onCreated.addListener(() => store.dispatch(fetchTabs()));
chrome.tabs.onUpdated.addListener(() => store.dispatch(fetchTabs()));
chrome.tabs.onMoved.addListener(() => store.dispatch(fetchTabs()));
chrome.tabs.onRemoved.addListener((tabId) => {
  store.dispatch(deselectTab(tabId));
  store.dispatch(fetchTabs());
});

// WINDOWS
store.dispatch(fetchWindows());
chrome.windows.onCreated.addListener(() => store.dispatch(fetchWindows()));
chrome.windows.onRemoved.addListener(() => store.dispatch(fetchWindows()));

chrome.storage.sync.get('listView', ({ listView }) => {
  if (typeof listView === 'string') store.dispatch(setListViewSuccess(listView));
});
