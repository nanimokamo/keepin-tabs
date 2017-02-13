import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as Chrome from '../../chrome.js';
import { setBookmarksVisibility, addSelectedTabsToFolder } from '../../actions.js';
import { getShowBookmarks } from '../../selectors.js'

import BottomSheet from '../BottomSheet';
import Icon from '../Icon';
import List from '../List';
import ListItem from '../List/ListItem';

class Bookmarks extends React.Component {
	static propTypes = {
		hideBookmarks: React.PropTypes.func,
		open: React.PropTypes.bool,
		addSelectedTabsToFolder: React.PropTypes.func,
	}

	state = {
		newFolderName: '',
		parentTitle: undefined,
		parentId: undefined,
		currentId: undefined,
		showCreateNewFolder: true,
		bookmarks: [],
	};
	
	constructor(props) {
		super(props);
		this.goToFolder = this.goToFolder.bind(this);
		this.addToFolder = this.addToFolder.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onKeypress = this.onKeypress.bind(this);
		this.renderBookmarksItem = this.renderBookmarksItem.bind(this);
	}

	componentDidMount() {
		this.getBookmarks();
	}

	async getBookmarks(id = '0') {
		const bookmarks = await Chrome.getBookmarksById(id);
		this.setState({
			showCreateNewFolder: id !== '0',
			parentTitle: bookmarks[0].title,
			parentId: bookmarks[0].parentId,
			currentId: id,
			bookmarks: bookmarks[0].children.filter(bookmark => bookmark.children)
		});
	}

	async onKeypress(e) {
		e.persist();
		e.stopPropagation();

		if (e.key === 'Enter') {
			e.preventDefault();
			this.setState({ newFolderName: '' });
			const newFolderId = await Chrome.createBookmarksFolder(this.state.currentId, e.target.value);
			this.getBookmarks(this.state.currentId);
		}
	}

	onInputChange(e) {
		this.setState({ newFolderName: e.target.value });
	}

	onClickBack() {
		this.goToFolder(this.state.parentId);
	}

	goToFolder({ id }) {
		this.getBookmarks(id);
	}

	addToFolder({ id }) {
		this.props.addSelectedTabsToFolder(id);
		this.props.hideBookmarks();
	}

	renderNewFolder() {
		return (
			<li className="Bookmarks-item Bookmarks-item--newFolder">
				<Icon name="new-folder" />
				<div className="Bookmarks-itemTitle">
					<input
						className="Bookmarks-itemTitleInput"
						type="text"
						onChange={this.onInputChange}
						value={this.state.newFolderName}
						onKeyPress={this.onKeypress}
						placeholder="Bookmark name"
					/>
				</div>
			</li>
		);
	}

	renderBookmarksItem(props) {
		return (
			props.children ?
				<ListItem
					key={props.id}
					icon="folder"
					onClick={this.addToFolder}
					onClickData={{ id: props.id }}
					actionIcon="right-arrow"
					onClickAction={this.goToFolder}
					onClickActionData={{ id: props.id }}
				>
					{props.title}
				</ListItem>
			: null
		);
	}

	render() {
		const { bookmarks, showCreateNewFolder, parentId, parentTitle } = this.state;
		const { hideBookmarks, open } = this.props;

		return (
			<BottomSheet
				open={open}
				title={parentTitle || 'Add tabs to folder'}
				showBack={parentId !== undefined}
				onClickBack={this.onClickBack}
				onClickCover={hideBookmarks}
				footnote={showCreateNewFolder ? this.renderNewFolder() : null}
			>
				<div className="Bookmarks">
					<List className="Bookmarks-items">
						{bookmarks && bookmarks.length ?
							bookmarks.map(this.renderBookmarksItem)
						:
							<li className="Bookmarks-item Bookmarks-item--noFolders">
								<div className="Bookmarks-itemTitle">No folders.</div>
							</li>
						}
					</List>
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

const mapStateToProps = createStructuredSelector({
	open: getShowBookmarks,
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
