import Icon from '../Icon';
import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { getNumTabs, getMode, getQuery, getListView } from '../../selectors.js'
import { setQuery, setMode, sortTabs, setListView } from '../../actions.js'

const Header = ({ mode, numTabs, query, setModeSearch, setModeDefault, setListView, sortTabs, setQuery, clearQuery, listView }) => {
	return (
		<header className="Header" data-mode={mode}>
			{mode === 'default' ?
				<section className={`Header--${mode}`}>
					<h1>{numTabs} tabs</h1>
					<div className="Header-actions">
						<button
							className="icon-button"
							onClick={listView === 'default' ? setListView.bind(undefined, 'compact') : setListView.bind(undefined, 'default')}
							title="Sort"
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
						onClick={setModeDefault}
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
					>
						<Icon name="close" />
					</button>
				</section>
			: null}
		</header>
	);
};

const mapDispatchToProps = (dispatch) => ({
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
});

const mapStateToProps = (state) => createStructuredSelector({
	numTabs: getNumTabs,
	mode: getMode,
	query: getQuery,
	listView: getListView,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
