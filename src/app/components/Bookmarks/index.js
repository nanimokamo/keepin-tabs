import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import BottomSheet from '../BottomSheet';

const Bookmarks = () => {
	return (
		<BottomSheet title="Add tabs to folder">
			<ul>
				some bookmarks some bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarks
				some bookmarks some bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarks
				some bookmarks some bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarks
								some bookmarks some bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarks
												some bookmarks some bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarks
																some bookmarks some bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarks
																				some bookmarks some bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarks
																								some bookmarks some bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarks
																												some bookmarks some bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarkssome bookmarks
			</ul>
		</BottomSheet>
	);
};

const mapDispatchToProps = (dispatch) => ({
	// setModeSearch() {
	// 	dispatch(setMode('search'));
	// },
});

const mapStateToProps = (state) => createStructuredSelector({
	// numTabs: getNumTabs,
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
