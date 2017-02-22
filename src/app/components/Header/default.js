import React from 'react';

import IconButton from '../shared/IconButton';

const HeaderDefault = ({ numTabs, toggleView, listView, sortTabs, setModeSearch }) => {
  return (
    <section className="Header-section Header--default">
      <div className="Header-title">
        <h1>{numTabs} tabs</h1>
      </div>
      <div className="Header-actions">
        <IconButton
          onClick={toggleView}
          title={listView === 'default' ? 'Compact view' : 'Expanded view'}
          icon={`listView--${listView === 'default' ? 'compact' : 'default'}`}
        />
        <IconButton
          onClick={sortTabs}
          title="Sort"
          icon="sort"
        />
        <IconButton
          onClick={setModeSearch}
          title="Search"
          icon="search"
        />
      </div>
    </section>
  );
};

HeaderDefault.propTypes = {
  numTabs: React.PropTypes.number,
  toggleView: React.PropTypes.func,
  listView: React.PropTypes.string,
  sortTabs: React.PropTypes.func,
  setModeSearch: React.PropTypes.func,
};

export default HeaderDefault;
