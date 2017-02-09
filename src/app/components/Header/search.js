import React from 'react';

import IconButton from '../IconButton';

const HeaderSearch = ({ query, setQuery, selectAll, clearQuery, cancelSearch }) => {
	return (
		<section className="Header--search">
			<IconButton
				className="main-action"
				onClick={cancelSearch}
				title="Back"
				icon="back"
			/>
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

export default HeaderSearch;
