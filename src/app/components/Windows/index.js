import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Dialog from '../shared/Dialog';
import List from '../shared/List';
import ListItem from '../shared/List/ListItem';

import * as Chrome from '../../chrome.js';

import { toggleWindowsVisibility, moveSelectedTabsToWindow } from '../../store/actions.js';
import { getShowWindows } from '../../store/selectors.js';

class Windows extends React.Component {
  static propTypes = {
    hideWindows: React.PropTypes.func,
    open: React.PropTypes.bool,
    moveSelectedTabsToWindow: React.PropTypes.func,
  }

  state = {
    windows: [],
  }

  constructor(props) {
    super(props);
    this.moveToWindow = this.moveToWindow.bind(this);
    this.moveToNewWindow = this.moveToNewWindow.bind(this);
    this.renderWindowsItem = this.renderWindowsItem.bind(this);
    this.renderNewWindowsItem = this.renderNewWindowsItem.bind(this);
  }

  componentDidMount() {
    this.getWindows();
  }

  async getWindows() {
    const windows = await Chrome.getWindows();
    this.setState({ windows });
  }

  moveToNewWindow() {
    this.props.moveSelectedTabsToWindow();
  }

  moveToWindow({ id }) {
    this.props.moveSelectedTabsToWindow(id);
  }

  renderWindowsItem(props, i) {
    return (
      <ListItem
        key={props.id}
        onClick={this.moveToWindow}
        onClickData={{ id: props.id }}
        disabled={props.focused}
        aside={`${props.tabs.length}`}
      >
        {`Window ${i + 1}`}
      </ListItem>
    );
  }

  renderNewWindowsItem() {
    return (
      <List size="large">
        <ListItem onClick={this.moveToNewWindow} icon="add">
          New window
        </ListItem>
      </List>
    );
  }

  render() {
    const { windows } = this.state;
    const { hideWindows, open } = this.props;

    return (
      <Dialog
        open={open}
        title="Move selected to..."
        onClickCover={hideWindows}
        footnote={this.renderNewWindowsItem()}
      >
        {windows && windows.length ?
          <List size="large">
            {windows.map(this.renderWindowsItem)}
          </List>
        : null}
      </Dialog>
    );
  }
}

const mapDispatchToProps = {
  moveSelectedTabsToWindow,
  hideWindows: toggleWindowsVisibility,
};

const mapStateToProps = createStructuredSelector({
  open: getShowWindows,
});

export default connect(mapStateToProps, mapDispatchToProps)(Windows);
