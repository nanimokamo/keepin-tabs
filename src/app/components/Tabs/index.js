import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { createStructuredSelector } from 'reselect';

import Icon from '../shared/Icon';
import TwoLineList from '../shared/TwoLineList';
import TwoLineListItem from '../shared/TwoLineList/TwoLineListItem';
import SectionTitle from '../shared/SectionTitle';

import * as Chrome from '../../chrome.js';

import {
	getHighlightedTabId,
	getMode,
	getQuery,
	getListView,
	getSelectedTabIds,
	getIsDragging,
	getPinnedVisibleTabs,
	getUnpinnedVisibleTabs,
} from '../../selectors.js'

import {
	toggleTabSelected,
	deselectTab,
	setDragging,
	toggleTabPinned,
} from '../../actions.js';

const SortableTabsItem = SortableElement(TwoLineListItem);
const SortableTabs = SortableContainer(({ children, view }) => {
	return <TwoLineList className="TabsList" view={view}>{children}</TwoLineList>;
});
const MissingIcon = <Icon name="missing" />;

class Tabs extends Component {
	static propTypes = {
		setDragging: React.PropTypes.func,
		selectTab: React.PropTypes.func,
		deselectTab: React.PropTypes.func,
		pinnedTabs: React.PropTypes.array,
		unpinnedTabs: React.PropTypes.array,
		highlightedTabId: React.PropTypes.number,
		mode: React.PropTypes.string,
		query: React.PropTypes.string,
		listView: React.PropTypes.string,
		selectedTabIds: React.PropTypes.array,
		isDragging: React.PropTypes.bool,
		pinTab: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.onSortPinned = this.onSortPinned.bind(this);
		this.onSortUnpinned = this.onSortUnpinned.bind(this);
		this.onSortStart = this.onSortStart.bind(this);
		this.renderPinnedTab = this.renderPinnedTab.bind(this);
		this.renderUnpinnedTab = this.renderUnpinnedTab.bind(this);
		this.goToTab = this.goToTab.bind(this);
	}

	onSortStart() {
		this.props.setDragging(true);
	}

	onSortUnpinned({ oldIndex, newIndex }) {
		this.sort(this.props.unpinnedTabs[oldIndex], newIndex);
	}

	onSortPinned({ oldIndex, newIndex }) {
		this.sort(this.props.pinnedTabs[oldIndex], newIndex);
	}

	sort(tab, index) {
		if (tab) Chrome.moveTabs(tab.id, index);
		this.props.setDragging(false);
	}

	goToTab(id) {
		Chrome.goToTab(id);
	}

	renderUnpinnedTab(tab) {
		return this.renderTab({ ...tab, collection: 'unpinned' });
	}

	renderPinnedTab(tab) {
		return this.renderTab({ ...tab, collection: 'pinned' });
	}

	renderTab(props) {
		const icon = (
			!props.favIconUrl || props.favIconUrl === 'undefined' || !props.favIconUrl.length
				? MissingIcon
				: (
					<div className="Icon">
						<img src={props.favIconUrl} />
					</div>
				)
			);
		return (
			<SortableTabsItem
				{...props}
				key={props.id}
				line1={props.status === 'loading' ? 'Loading...' : props.title}
				line2={props.url}
				icon={icon}
				selected={this.props.selectedTabIds.includes(props.id)}
				highlighted={this.props.highlightedTabId === props.id}
				actions={[
					{
						icon: 'pin',
						onClick: this.props.pinTab,
					},
					{
						icon: 'refresh',
						onClick: Chrome.refreshTab,
					},
					{
						icon: 'close',
						onClick: Chrome.closeTab,
					},
				]}
				onClick={this.goToTab}
				onClickData={props.id}
				onClickMainAction={this.props.toggleTabSelected}
			/>
		);
	}

	render() {
		const { pinnedTabs, unpinnedTabs, listView } = this.props;
		const sortableTabsProps = {
			distance: 10,
			onSortStart: this.onSortStart,
			helperClass: "is-dragging",
			lockAxis: "y",
			view: listView,
		};

		return (
			<div className="Tabs">
				{unpinnedTabs.length && pinnedTabs.length ?
					<SectionTitle>Pinned</SectionTitle>
				: null}

				{pinnedTabs.length ?
					<SortableTabs
						{...sortableTabsProps}
						onSort={this.onSortPinned}
						onSortEnd={this.onSortPinned}
					>
						{pinnedTabs.map(this.renderPinnedTab)}
					</SortableTabs>
				: null}

				{unpinnedTabs.length && pinnedTabs.length ?
					<SectionTitle>Unpinned</SectionTitle>
				: null}

				{unpinnedTabs.length ?
					<SortableTabs
						{...sortableTabsProps}
						onSort={this.onSortUnpinned}
						onSortEnd={this.onSortUnpinned}
					>
						{unpinnedTabs.map(this.renderUnpinnedTab)}
					</SortableTabs>
				: null}
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	setDragging(dragging) {
		dispatch(setDragging(dragging));
	},
	toggleTabSelected(id) {
		dispatch(toggleTabSelected(id));
	},
	deselectTab(id) {
		dispatch(deselectTab(id));
	},
	pinTab(id) {
		dispatch(toggleTabPinned(id));
	},
});

const mapStateToProps = createStructuredSelector({
	pinnedTabs: getPinnedVisibleTabs,
	unpinnedTabs: getUnpinnedVisibleTabs,
	highlightedTabId: getHighlightedTabId,
	mode: getMode,
	query: getQuery,
	listView: getListView,
	selectedTabIds: getSelectedTabIds,
	isDragging: getIsDragging,
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
