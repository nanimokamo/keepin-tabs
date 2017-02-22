import React from 'react';

import Icon from '../../Icon';
import IconButton from '../../IconButton';

import { otherProps } from '../../../../utils.js';

class TwoLineListItem extends React.Component {
  static propTypes = {
    icon: React.PropTypes.element,
    line1: React.PropTypes.string,
    line2: React.PropTypes.string,
    actions: React.PropTypes.array,
    onClick: React.PropTypes.func,
    onClickMainAction: React.PropTypes.func,
    selected: React.PropTypes.bool,
    highlighted: React.PropTypes.bool,
    onClickData: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
      React.PropTypes.object,
      React.PropTypes.number,
    ]),
  }

  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickMainAction = this.onClickMainAction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.highlighted && !this.props.highlighted) this.el.scrollIntoViewIfNeeded(false);
  }

  onClick() {
    if (this.props.onClick) this.props.onClick(this.props.onClickData);
  }

  onClickMainAction(e) {
    e.stopPropagation();
    if (this.props.onClickMainAction) this.props.onClickMainAction(this.props.onClickData);
  }

  renderAction(props, i) {
    return (
      <IconButton
        key={i}
        className="TwoLineListItem-action"
        onClick={props.onClick}
        onClickData={this.props.onClickData}
        title={props.title}
        icon={props.icon}
        data-active={props.active}
      />
    );
  }

  render() {
    const { icon, line1, line2, actions, selected, highlighted, className } = this.props;

    return (
      <li
        {...otherProps(Object.keys(this.constructor.propTypes), this.props)}
        className={`TwoLineListItem ${className || ''}`}
        onClick={this.onClick}
        data-selected={selected}
        data-highlighted={highlighted}
        ref={(el) => this.el = el}
      >
        <div className="TwoLineListItem-mainAction" onClick={this.onClickMainAction}>
          {icon ?
            <div className="TwoLineListItem-mainActionDefault">
              {icon}
            </div>
          : null}
          <Icon
            name={selected ? 'checkbox--checked' : 'checkbox'}
            title={selected ? 'Deselect' : 'Select'}
            align
          />
        </div>
        <div className="TwoLineListItem-content">
          <div className="TwoLineListItem-contentLine1">{line1}</div>
          <div className="TwoLineListItem-contentLine2">{line2}</div>
        </div>
        {actions.length ?
        <div className="TwoLineListItem-actions">
          {actions.map(this.renderAction)}
        </div> : null}
      </li>
    );
  }
}

export default TwoLineListItem;
