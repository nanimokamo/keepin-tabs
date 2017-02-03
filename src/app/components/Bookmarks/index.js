import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setBookmarksVisibility, addSelectedTabsToFolder, createNewFolder } from '../../actions.js';

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
		this.handleKeypress = this.handleKeypress.bind(this);
		this.handleClickCancel = this.handleClickCancel.bind(this);
	}

	componentDidMount() {
		this.getBookmarks();
	}

	getBookmarks() {
		chrome.bookmarks.getTree((bookmarks) => {
			this.setState({
				bookmarks: bookmarks[0].children,
			});
		});
	}

	componentWillMount() {
		if (this.interval) window.clearInterval(this.interval);
	}

	addToFolder(id) {
		this.props.addSelectedTabsToFolder(id);
		this.props.hideBookmarks();
	}

	addFolder(e, id) {
		e.stopPropagation();
		this.setState({ addId: id });
	}

	handleKeypress(e) {
		e.persist();
		if (e.key === 'Enter') {
			e.stopPropagation();
			e.preventDefault();
			this.props.createNewFolder(this.state.addId, e.target.value);
			this.setState({ addId: null });
			this.getBookmarks();
		}
	}

	handleClickCancel() {
		this.setState({
			addId: null,
		});
	}

	buildFolders(bookmarks) {
		return (
			bookmarks && bookmarks.length ?
			<ul className="Bookmarks-items">
				{bookmarks.map((bookmark) => {
					return (
						bookmark.children ?
							<li className="Bookmarks-item" key={bookmark.id}>
								<div className="Bookmarks-itemInner" onClick={(e) => this.addToFolder(bookmark.id)}>
									<Icon name="folder" />
									<div className="Bookmarks-itemTitle">
										{bookmark.title}
										<span>{bookmark.children ? bookmark.children.filter(b => b.hasOwnProperty('children')).length : null}</span>
									</div>
									<Icon name="add" onClick={(e) => this.addFolder(e, bookmark.id)} />
								</div>
								{bookmark.id === this.state.addId ?
									<div className="Bookmarks-itemInner Bookmarks-itemInner--newFolder">
										<Icon name="new-folder" />
										<div className="Bookmarks-itemTitle">
											<input
												ref={(e) => {
													if (e) e.focus();
												}}
												className="Bookmarks-itemTitleInput"
												type="text"
												onKeyPress={this.handleKeypress}
												placeholder="Bookmark name"
											/>
										</div>
										<div
											className="Bookmarks-cancelNewBookmark"
											onClick={this.handleClickCancel}
										>
											Cancel
										</div>
									</div>
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
	createNewFolder(parentId, name) {
		dispatch(createNewFolder(parentId, name));
	},
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
