import React from 'react';

import IconButton from '../shared/IconButton';

const HeaderSearch = ({ query, setQuery, selectAll, clearQuery, cancelSearch }) => {
  return (
    <section className="Header-section Header--search">
      <div className="Header-mainAction">
        <IconButton
          onClick={cancelSearch}
          title="Back"
          icon="back"
        />
      </div>

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
      <div className="Header-actions">
        <IconButton
          onClick={selectAll}
          title="Select all"
          icon="select-all"
        />
        <IconButton
          onClick={clearQuery}
          disabled={query.length ? false : true}
          title="Clear"
          icon="close"
        />
      </div>
    </section>
  );
};

HeaderSearch.propTypes = {
  query: React.PropTypes.string,
  setQuery: React.PropTypes.func,
  selectAll: React.PropTypes.func,
  clearQuery: React.PropTypes.func,
  cancelSearch: React.PropTypes.func,
};

export default HeaderSearch;
