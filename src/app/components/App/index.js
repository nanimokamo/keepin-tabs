import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { createStructuredSelector } from 'reselect';

import Header from '../Header';
import Bookmarks from '../Bookmarks';
import TabsList from '../TabsList';
import TabsListItem from '../TabsListItem';
import { goToTab, moveTab } from '../../utils.js';
import { getVisibleTabs, getHighlightedTabId, getMode, getQuery, getListView, getSelectedTabIds, getShowBookmarks } from '../../selectors.js'
import { setMode, setHighlightedTabId, selectTab, deselectTab } from '../../actions.js';
import { IGNORE_EVENTS } from '../../constants.js';

const SortableTabsListItem = SortableElement(TabsListItem);
const SortableTabsList = SortableContainer(TabsList);

class App extends Component {
	constructor(props) {
		super(props);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.onSort = this.onSort.bind(this);
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
		document.body.dataset.view = this.props.listView;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.listView !== this.props.listView) document.body.dataset.view = nextProps.listView;
	}

	handleKeyDown(e) {
		const {
			tabs,
			mode,
			highlightedTabId,
			setHighlightedTabId,
			setModeDefault,
			setModeSearch,
			query,
		} = this.props;

		if (IGNORE_EVENTS.includes(e.code)) return false;

		switch (e.code) {
			case 'ArrowUp':
				e.preventDefault();

				if (highlightedTabId === undefined) {
					setHighlightedTabId(tabs[tabs.length - 1].id);
				} else {
					const currentIndex = tabs.findIndex(tab => tab.id === highlightedTabId);
					const nextHighlightedId = (currentIndex - 1) < 0 ? tabs[tabs.length - 1].id : tabs[currentIndex - 1].id;
					setHighlightedTabId(nextHighlightedId);
				}

				break;
			case 'ArrowDown':
				e.preventDefault();

				if (highlightedTabId === undefined) {
					setHighlightedTabId(tabs[0].id);
				} else {
					const currentIndex = tabs.findIndex(tab => tab.id === highlightedTabId);
					const nextHighlightedId = (currentIndex + 1) > (tabs.length - 1) ? tabs[0].id : tabs[currentIndex + 1].id;
					setHighlightedTabId(nextHighlightedId);
				}

				break;
			case 'Enter':
				goToTab(highlightedTabId);
				break;
			case 'Backspace':
				if (mode === 'search' && query.length === 0) setModeDefault();
				break;
			default:
				setModeSearch();
		}
	}

	onSort({ oldIndex, newIndex }) {
		const tab = this.props.tabs[oldIndex];
		if (tab) moveTab(tab.id, newIndex);
	}

	render() {
		const { tabs, highlightedTabId, selectedTabIds, selectTab, deselectTab, showBookmarks } = this.props;
		const pinnedTabs = tabs.filter(tab => tab.pinned);
		const unpinnedTabs = tabs.filter(tab => !tab.pinned);

		return (
			<main className="App">
				<Header />

				<div className="App-content">
					{showBookmarks ?
						<Bookmarks />
					: null}
					{pinnedTabs.length ?
					<SortableTabsList
						distance={10}
						onSort={this.onSort}
						onSortEnd={this.onSort}
					>
						{pinnedTabs.map(tab => {
							return (
								<SortableTabsListItem
									key={tab.id}
									{...tab}
									helperClass="is-dragging"
									collection="pinned"
									highlighted={highlightedTabId === tab.id}
									selected={selectedTabIds.includes(tab.id)}
									selectTab={selectTab}
									deselectTab={deselectTab}
								/>
							);
						})}
					</SortableTabsList>
					: null}

					{unpinnedTabs.length ?
					<SortableTabsList
						distance={10}
						onSort={this.onSort}
						onSortEnd={this.onSort}
					>
						{unpinnedTabs.map(tab => {
							return (
								<SortableTabsListItem
									key={tab.id}
									{...tab}
									helperClass="is-dragging"
									collection="unpinned"
									highlighted={highlightedTabId === tab.id}
									selected={selectedTabIds.includes(tab.id)}
									selectTab={selectTab}
									deselectTab={deselectTab}
								/>
							);
						})}
					</SortableTabsList>
					: null}
				</div>
			</main>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	setModeSearch() {
		dispatch(setMode('search'));
	},
	setModeDefault() {
		dispatch(setMode('default'));
	},
	setHighlightedTabId(id) {
		dispatch(setHighlightedTabId(id));
	},
	selectTab(id) {
		dispatch(selectTab(id));
	},
	deselectTab(id) {
		dispatch(deselectTab(id));
	},
});

const mapStateToProps = (state) => createStructuredSelector({
	tabs: getVisibleTabs,
	highlightedTabId: getHighlightedTabId,
	mode: getMode,
	query: getQuery,
	listView: getListView,
	selectedTabIds: getSelectedTabIds,
	showBookmarks: getShowBookmarks,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
