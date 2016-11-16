// import Preact, { render, h } from 'preact';
import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App';

chrome.tabs.query({ currentWindow: true }, (tabs) => {
	render(<App tabs={tabs} />, document.getElementById('app'));
});
