import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setBookmarksVisibility, addSelectedTabsToFolder } from '../../actions.js';

import BottomSheet from '../BottomSheet';
import Icon from '../Icon';

class Bookmarks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookmarks: [],
		};
		this.INTERVAL_MS = 1000;
		this.buildFolders = this.buildFolders.bind(this);
		this.addFolder = this.addFolder.bind(this);
	}

	componentDidMount() {
		// this.interval = window.setInterval(() => {
			chrome.bookmarks.getTree((bookmarks) => {
				this.setState({
					bookmarks: bookmarks[0].children,
				});
			});
		// }, this.INTERVAL_MS);
	}

	componentWillMount() {
		if (this.interval) window.clearInterval(this.interval);
	}

	addToFolder(id) {
		this.props.addSelectedTabsToFolder(id);
	}

	addFolder(e, id) {
		e.stopPropagation();
		console.log(id);
		this.setState({ addId: id });
	}

	buildFolders(bookmarks) {
		return (
			bookmarks && bookmarks.length ?
			<ul className="Bookmarks-items">
				{bookmarks.map((bookmark) => {
					console.log(bookmark.id, this.state.addId);
					return (
						bookmark.children ?
							<li className="Bookmarks-item" key={bookmark.id}>
								<div className="Bookmarks-itemInner"  onClick={(e) => this.addToFolder(bookmark.id)}>
									<Icon name="folder" />
									<div className="Bookmarks-itemTitle">
										{bookmark.title}
										<span>{bookmark.children ? bookmark.children.length : null}</span>
									</div>
									<Icon name="add" onClick={(e) => this.addFolder(e, bookmark.id)} />
								</div>
								{bookmark.id === this.state.addId ?
									<input type="text" value="" />
								: null}
								{this.buildFolders(bookmark.children)}
							</li>
						: null
					);
				})}
			</ul>
			: null
		);
	}

	render() {
		const { bookmarks } = this.state;
		const { hideBookmarks } = this.props;
		return (
			<BottomSheet title="Add tabs to folder" onClickCover={hideBookmarks}>
				<div className="Bookmarks">
					{this.buildFolders(bookmarks)}
				</div>
			</BottomSheet>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	hideBookmarks() {
		dispatch(setBookmarksVisibility(false));
	},
	addSelectedTabsToFolder(id) {
		dispatch(addSelectedTabsToFolder(id));
	},
});

const mapStateToProps = (state) => createStructuredSelector({
	// numTabs: getNumTabs,
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
