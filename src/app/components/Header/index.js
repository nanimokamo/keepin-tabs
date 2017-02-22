import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getNumTabs,
  getMode,
  getQuery,
  getListView,
  getNumSelectedTabs
} from '../../store/selectors.js'

import {
  setQuery,
  setMode,
  sortTabs,
  toggleListView,
  selectAllVisibleTabs,
  deselectAllTabs,
  closeTabs,
  setBookmarksVisibility,
  toggleWindowsVisibility,
} from '../../store/actions.js'

import HeaderDefault from './default.js';
import HeaderSearch from './search.js';
import HeaderSelect from './select.js';

const Header = ({
  mode,
  numTabs,
  toggleView,
  listView,
  query,
  setQuery,
  selectAll,
  setModeSearch,
  clearQuery,
  sortTabs,
  cancelSearch,
  cancelSelect,
  numSelectedTabs,
  showBookmarks,
  showWindows,
  closeTabs,
}) => {
  return (
    <header className="Header" data-mode={mode}>
      {mode === 'default' ?
        <HeaderDefault
          numTabs={numTabs}
          toggleView={toggleView}
          listView={listView}
          sortTabs={sortTabs}
          setModeSearch={setModeSearch}
        />
      : null}
      {mode === 'search' ?
        <HeaderSearch
          query={query}
          setQuery={setQuery}
          selectAll={selectAll}
          clearQuery={clearQuery}
          cancelSearch={cancelSearch}
        />
      : null}
      {mode === 'select' ?
        <HeaderSelect
          cancelSelect={cancelSelect}
          numSelectedTabs={numSelectedTabs}
          showBookmarks={showBookmarks}
          showWindows={showWindows}
          sortTabs={sortTabs}
          closeTabs={closeTabs}
        />
      : null}
    </header>
  );
};

Header.propTypes = {
  mode: React.PropTypes.string,
  numTabs: React.PropTypes.number,
  numSelectedTabs: React.PropTypes.number,
  toggleView: React.PropTypes.func,
  listView: React.PropTypes.string,
  query: React.PropTypes.string,
  setQuery: React.PropTypes.func,
  selectAll: React.PropTypes.func,
  setModeSearch: React.PropTypes.func,
  clearQuery: React.PropTypes.func,
  sortTabs: React.PropTypes.func,
  cancelSearch: React.PropTypes.func,
  cancelSelect: React.PropTypes.func,
  setModeDefault: React.PropTypes.func,
  showBookmarks: React.PropTypes.func,
  showWindows: React.PropTypes.func,
  closeTabs: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  setQuery(e) {
    dispatch(setQuery(e.target.value));
  },
  closeTabs() {
    dispatch(closeTabs());
  },
  sortTabs() {
    dispatch(sortTabs());
  },
  setModeSearch() {
    dispatch(setMode('search'));
  },
  setModeDefault() {
    dispatch(setMode('default'));
  },
  selectAll() {
    dispatch(selectAllVisibleTabs());
  },
  clearQuery() {
    dispatch(setQuery(''));
  },
  cancelSearch() {
    dispatch(setMode('default'));
    dispatch(setQuery(''));
  },
  toggleView() {
    dispatch(toggleListView());
  },
  showBookmarks() {
    dispatch(setBookmarksVisibility(true));
  },
  showWindows() {
    dispatch(toggleWindowsVisibility());
  },
  cancelSelect() {
    dispatch(deselectAllTabs());
  },
});

const mapStateToProps = createStructuredSelector({
  numTabs: getNumTabs,
  mode: getMode,
  query: getQuery,
  listView: getListView,
  numSelectedTabs: getNumSelectedTabs,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
