import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	getNumTabs,
	getMode,
	getQuery,
	getListView,
	getNumSelectedTabs
} from '../../selectors.js'
import {
	setQuery,
	setMode,
	sortTabs,
	setListView,
	deselectAllTabs,
	closeTabs,
	setBookmarksVisibility,
} from '../../actions.js'
import Icon from '../Icon';

const Header = ({
	mode,
	numTabs,
	numSelectedTabs,
	query,
	closeTabs,
	setModeSearch,
	deselectAllTabs,
	setModeDefault,
	setListView,
	sortTabs,
	setQuery,
	clearQuery,
	listView,
	showBookmarks,
}) => {
	return (
		<header className="Header" data-mode={mode}>
			{mode === 'default' ?
				<section className={`Header--${mode}`}>
					<h1>{numTabs} tabs</h1>
					<div className="Header-actions">
						<button
							className="icon-button"
							onClick={listView === 'default' ? setListView.bind(undefined, 'compact') : setListView.bind(undefined, 'default')}
							title={listView === 'default' ? 'Compact view' : 'Expanded view'}
						>
							<Icon name={`listView--${listView === 'default' ? 'compact' : 'default'}`} />
						</button>
						<button
							className="icon-button"
							onClick={sortTabs}
							title="Sort"
						>
							<Icon name="sort" />
						</button>
						<button
							className="icon-button"
							onClick={setModeSearch}
							title="Search"
						>
							<Icon name="search" />
						</button>
					</div>
				</section>
			: null}
			{mode === 'search' ?
				<section className={`Header--${mode}`}>
					<button
						className="icon-button main-action"
						onClick={() => {
							setModeDefault();
							clearQuery();
						}}
						title="Back"
					>
						<Icon name="back" />
					</button>
					<input
						autoComplete="off"
						className="TextInput"
						type="text"
						name="search"
						value={query}
						onChange={setQuery}
						placeholder="Search..."
						autoFocus
					/>
					<button
						className="icon-button"
						onClick={clearQuery}
						disabled={query.length ? false : true}
						title="Clear"
					>
						<Icon name="close" />
					</button>
				</section>
			: null}
			{mode === 'select' ?
				<section className={`Header--${mode}`}>
					<button
						className="icon-button main-action"
						onClick={deselectAllTabs}
						title="Back"
					>
						<Icon name="back" />
					</button>
					<h1>{numSelectedTabs} selected</h1>

					<div className="Header-actions">
						<button
							className="icon-button"
							onClick={showBookmarks}
							title="Bookmark"
						>
							<Icon name="bookmark" />
						</button>
						<button
							className="icon-button"
							onClick={sortTabs}
							title="Sort"
						>
							<Icon name="sort" />
						</button>
						<button
							className="icon-button"
							onClick={closeTabs}
							title="Close"
						>
							<Icon name="close" />
						</button>
					</div>
				</section>
			: null}
		</header>
	);
};

const mapDispatchToProps = (dispatch) => ({
	showBookmarks() {
		dispatch(setBookmarksVisibility(true));
	},
	setModeSearch() {
		dispatch(setMode('search'));
	},
	setModeDefault() {
		dispatch(setMode('default'));
	},
	sortTabs() {
		dispatch(sortTabs());
	},
	setQuery(e) {
		dispatch(setQuery(e.target.value));
	},
	setListView(view) {
		dispatch(setListView(view));
	},
	clearQuery() {
		dispatch(setQuery(''));
	},
	deselectAllTabs() {
		dispatch(deselectAllTabs());
	},
	closeTabs() {
		dispatch(closeTabs());
	}
});

const mapStateToProps = (state) => createStructuredSelector({
	numTabs: getNumTabs,
	mode: getMode,
	query: getQuery,
	listView: getListView,
	numSelectedTabs: getNumSelectedTabs,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
