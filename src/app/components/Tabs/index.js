import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Icon from '../shared/Icon';
import TwoLineList from '../shared/TwoLineList';
import TwoLineListItem from '../shared/TwoLineList/TwoLineListItem';
import SectionTitle from '../shared/SectionTitle';
import Sortable from '../shared/Sortable';
import SortableItem from '../shared/Sortable/SortableItem';

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
  getSelectedPinnedVisibleTabsIndexes,
  getSelectedUnpinnedVisibleTabsIndexes,
  getPinnedVisibleTabIds,
  getUnpinnedVisibleTabIds,
} from '../../store/selectors.js'

import {
  toggleTabSelected,
  deselectTab,
  setDragging,
  toggleTabPinned,
} from '../../store/actions.js';

import { otherProps } from '../../utils.js';

const SortableTwoLineList = Sortable(TwoLineList);
const SortableTabsItem = SortableItem(TwoLineListItem);
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
    pinnedTabIds: React.PropTypes.array,
    unpinnedTabIds: React.PropTypes.array,
    isDragging: React.PropTypes.bool,
    toggleTabPinned: React.PropTypes.func,
    toggleTabSelected: React.PropTypes.func,
    selectedPinnedTabsIndexes: React.PropTypes.array,
    selectedUnpinnedTabsIndexes: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.onSortPinned = this.onSortPinned.bind(this);
    this.onSortUnpinned = this.onSortUnpinned.bind(this);
    this.onSortStart = this.onSortStart.bind(this);
    this.renderTab = this.renderTab.bind(this);
  }

  onSortStart() {
    this.props.setDragging(true);
  }

  onSortPinned({ draggedIndexes, newIndex }) {
    const tabIds = draggedIndexes
      .reduce((state, index) => [...state, this.props.pinnedTabIds[index]], []);
    this.sort(tabIds, newIndex);
  }

  onSortUnpinned({ draggedIndexes, newIndex }) {
    const tabIds = draggedIndexes
      .reduce((state, index) => [...state, this.props.unpinnedTabIds[index]], []);
    this.sort(tabIds, (newIndex + this.props.pinnedTabs.length));
  }

  sort(ids, index) {
    if (ids.length) Chrome.moveTabs(ids, index);
    this.props.setDragging(false);
  }

  renderTab(props, index) {
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
        {...otherProps(['index', 'pinned', 'active', 'url', 'favIconUrl', 'status'], props)}
        className={props.active ? 'TabsList-item is-active' : ''}
        index={index}
        key={props.id}
        line1={props.status === 'loading' ? 'Loading...' : props.title}
        line2={props.url}
        icon={icon}
        selected={this.props.selectedTabIds.includes(props.id)}
        highlighted={this.props.highlightedTabId === props.id}
        actions={[
          {
            icon: 'pin',
            title: 'Pin',
            onClick: this.props.toggleTabPinned,
            active: props.pinned,
          },
          {
            icon: 'window',
            title: 'Move to window',
            onClick: this.props.showWindows,
            onClickData: props.id,
          },
          {
            icon: 'bookmark',
            title: 'Add to bookmarks',
            onClick: this.props.showBookmarks,
            onClickData: props.id,
          },
          {
            icon: 'close',
            title: 'Close',
            onClick: Chrome.closeTab,
          },
        ]}
        onClick={Chrome.goToTab}
        onClickData={props.id}
        onClickMainAction={this.props.toggleTabSelected}
      />
    );
  }

  render() {
    const { selectedPinnedTabsIndexes, selectedUnpinnedTabsIndexes, pinnedTabs, unpinnedTabs, listView } = this.props;
    const sortableTabsProps = {
      className: 'TabsList',
      view: listView,
      // distance: 10,
      // onSortStart: this.onSortStart,
      // helperClass: "is-dragging",
      // lockAxis: "y",
    };

    return (
      <div className="Tabs">
        {!unpinnedTabs.length && !pinnedTabs.length ?
          <div className="Tabs-noTabs">No tabs found</div>
        : null}

        {unpinnedTabs.length && pinnedTabs.length ?
          <SectionTitle>Pinned</SectionTitle>
        : null}

        {pinnedTabs.length ?
          <SortableTwoLineList
            {...sortableTabsProps}
            groupIndexes={selectedPinnedTabsIndexes}
            onSortEnd={this.onSortPinned}
          >
            {pinnedTabs.map(this.renderTab)}
          </SortableTwoLineList>
        : null}

        {unpinnedTabs.length && pinnedTabs.length ?
          <SectionTitle>Unpinned</SectionTitle>
        : null}

        {unpinnedTabs.length ?
          <SortableTwoLineList
            {...sortableTabsProps}
            groupIndexes={selectedUnpinnedTabsIndexes}
            onSortEnd={this.onSortUnpinned}
          >
            {unpinnedTabs.map(this.renderTab)}
          </SortableTwoLineList>
        : null}
      </div>
    )
  }
}

const mapDispatchToProps = {
  setDragging,
  toggleTabSelected,
  deselectTab,
  toggleTabPinned,
};

const mapStateToProps = createStructuredSelector({
  pinnedTabs: getPinnedVisibleTabs,
  pinnedTabIds: getPinnedVisibleTabIds,
  unpinnedTabs: getUnpinnedVisibleTabs,
  unpinnedTabIds: getUnpinnedVisibleTabIds,
  selectedPinnedTabsIndexes: getSelectedPinnedVisibleTabsIndexes,
  selectedUnpinnedTabsIndexes: getSelectedUnpinnedVisibleTabsIndexes,
  highlightedTabId: getHighlightedTabId,
  mode: getMode,
  query: getQuery,
  listView: getListView,
  selectedTabIds: getSelectedTabIds,
  isDragging: getIsDragging,
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
