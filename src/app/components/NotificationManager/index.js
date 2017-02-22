import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Toast from '../shared/Toast';
// import Snackbar from '../shared/Snackbar';

// import { toggleWindowsVisibility, moveSelectedTabsToWindow } from '../../store/actions.js';
import { getNotifications } from '../../store/selectors.js';

class NotificationManager extends React.Component {
  static propTypes = {
    notifications: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.renderNotification = this.renderNotification.bind(this);
  }

  renderNotification(props, i) {
    return props.type === 'Toast'
    ? (
      <Toast
        key={props.id}
      />
    )
    : null;/*(
      <Snackbar
        key={props.id}
      />
    );*/
  }

  render() {
    const { notifications } = this.props;

    return (
      <div className="NotificationManager">
        {notifications.map(this.renderNotification)}
      </div>
    );
  }
}

const mapDispatchToProps = {
  // removeNotification,
};

const mapStateToProps = createStructuredSelector({
  notifications: getNotifications,
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationManager);
