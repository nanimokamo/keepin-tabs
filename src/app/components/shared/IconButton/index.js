import React from 'react';

import Icon from '../Icon';

class IconButton extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
    onClick: React.PropTypes.func,
    // onClickData: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.stopPropagation();
    if (this.props.onClick) this.props.onClick(this.props.onClickData);
  }

  render() {
    const { className, icon, onClick, onClickData, ...props } = this.props;

    return (
      <button
        {...props}
        className={`IconButton ${className || ''}`}
        onClick={this.onClick}
      >
        <Icon name={icon} />
      </button>
    );
  }
}

export default IconButton;
