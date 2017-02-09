import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { createStructuredSelector } from 'reselect';

import TabsItem from '../TabsItem';
import SectionTitle from '../SectionTitle';

import { moveTab } from '../../utils.js';

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
	selectTab,
	deselectTab,
	setDragging,
} from '../../actions.js';

const SortableTabsItem = SortableElement(TabsItem);
const SortableTabs = SortableContainer(({ children }) => (<div className="TabsItems">{children}</div>));

class Tabs extends Component {
	constructor(props) {
		super(props);
		this.onSortPinned = this.onSortPinned.bind(this);
		this.onSortUnpinned = this.onSortUnpinned.bind(this);
		this.onSortStart = this.onSortStart.bind(this);
		this.renderPinnedTab = this.renderPinnedTab.bind(this);
		this.renderUnpinnedTab = this.renderUnpinnedTab.bind(this);
	}

	componentDidMount() {
		document.body.dataset.view = this.props.listView;
	}

	componentWillReceiveProps({ listView }) {
		if (listView !== this.props.listView) document.body.dataset.view = listView;
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

	sort(tab, newIndex) {
		if (tab) moveTab(tab.id, newIndex);
		this.props.setDragging(false);
	}

	renderUnpinnedTab(tab) {
		return this.renderTab({ ...tab, collection: 'unpinned' });
	}

	renderPinnedTab(tab) {
		return this.renderTab({ ...tab, collection: 'pinned' });
	}

	renderTab(props) {
		return (
			<SortableTabsItem
				{...props}
				key={props.id}
				highlighted={this.props.highlightedTabId === props.id}
				selected={this.props.selectedTabIds.includes(props.id)}
				selectTab={this.props.selectTab}
				deselectTab={this.props.deselectTab}
			/>
		);
	}

	render() {
		const { pinnedTabs, unpinnedTabs } = this.props;

		return (
			<div className="Tabs">
				{unpinnedTabs.length && pinnedTabs.length ?
					<SectionTitle>Pinned</SectionTitle>
				: null}

				{pinnedTabs.length ?
					<SortableTabs
						distance={10}
						onSortStart={this.onSortStart}
						onSort={this.onSortPinned}
						onSortEnd={this.onSortPinned}
						helperClass="is-dragging"
					>
						{pinnedTabs.map(this.renderPinnedTab)}
					</SortableTabs>
				: null}

				{unpinnedTabs.length && pinnedTabs.length ?
					<SectionTitle>Unpinned</SectionTitle>
				: null}

				{unpinnedTabs.length ?
					<SortableTabs
						distance={10}
						onSortStart={this.onSortStart}
						onSort={this.onSortUnpinned}
						onSortEnd={this.onSortUnpinned}
						helperClass="is-dragging"
					>
						{unpinnedTabs.map(this.renderUnpinnedTab)}
					</SortableTabs>
				: null}
			</div>
		)
	}
}

Tabs.propTypes = {
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
};

const mapDispatchToProps = (dispatch) => ({
	setDragging(dragging) {
		dispatch(setDragging(dragging));
	},
	selectTab(id) {
		dispatch(selectTab(id));
	},
	deselectTab(id) {
		dispatch(deselectTab(id));
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
