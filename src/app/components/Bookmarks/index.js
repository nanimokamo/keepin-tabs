import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setBookmarksVisibility, addSelectedTabsToFolder } from '../../actions.js';
import { createBookmarksFolder, getBookmarksById } from '../../utils.js';

import BottomSheet from '../BottomSheet';
import Icon from '../Icon';
import BookmarksItem from '../BookmarksItem';

class Bookmarks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newFolderName: '',
			parentTitle: undefined,
			parentId: undefined,
			currentId: undefined,
			showCreateNewFolder: true,
			bookmarks: [],
		};

		this.goToFolder = this.goToFolder.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeypress = this.handleKeypress.bind(this);
	}

	componentDidMount() {
		this.getBookmarks();
	}

	async getBookmarks(id = '0') {
		const bookmarks = await getBookmarksById(id);
		this.setState({
			showCreateNewFolder: id !== '0',
			parentTitle: bookmarks[0].title,
			parentId: bookmarks[0].parentId,
			currentId: id,
			bookmarks: bookmarks[0].children.filter(bookmark => bookmark.children)
		});
	}

	async handleKeypress(e) {
		e.persist();
		e.stopPropagation();

		if (e.key === 'Enter') {
			e.preventDefault();
			this.setState({ newFolderName: '' });
			const newFolderId = await createBookmarksFolder(this.state.currentId, e.target.value);
			this.getBookmarks(this.state.currentId);
		}
	}

	handleInputChange(e) {
		this.setState({ newFolderName: e.target.value });
	}

	goToFolder(id) {
		this.getBookmarks(id);
	}

	addToFolder(e, id) {
		console.log('adding to folder');
		this.props.addSelectedTabsToFolder(id);
		this.props.hideBookmarks();
	}

	buildNewFolder() {
		return (
			<li className="Bookmarks-item Bookmarks-item--newFolder">
				<Icon name="new-folder" />
				<div className="Bookmarks-itemTitle">
					<input
						className="Bookmarks-itemTitleInput"
						type="text"
						onChange={this.handleInputChange}
						value={this.state.newFolderName}
						onKeyPress={this.handleKeypress}
						placeholder="Bookmark name"
					/>
				</div>
			</li>
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
				onClickBack={() => this.goToFolder(parentId)}
				onClickCover={hideBookmarks}
			>
				<div className="Bookmarks">
					<ul className="Bookmarks-items">
						{showCreateNewFolder ?
							this.buildNewFolder()
						: null}
						{bookmarks && bookmarks.length ?
							bookmarks.map((bookmark) => {
								return (
									bookmark.children ?
										<BookmarksItem
											key={bookmark.id}
											id={bookmark.id}
											title={bookmark.title}
											addToFolder={this.addToFolder}
											goToFolder={this.goToFolder}
										/>
									: null
								);
							})
						:
							<li className="Bookmarks-item Bookmarks-item--noFolders">
								<div className="Bookmarks-itemTitle">No folders.</div>
							</li>
						}
					</ul>
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
