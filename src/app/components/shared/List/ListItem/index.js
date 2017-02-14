import React from 'react';

import Icon from '../../Icon';

class ListItem extends React.Component {
	static propTypes = {
		icon: React.PropTypes.string,
		onClick: React.PropTypes.func,
		onClickData: React.PropTypes.object,
		actionIcon: React.PropTypes.string,
		onClickAction: React.PropTypes.func,
		onClickActionData: React.PropTypes.object,
		disabled: React.PropTypes.bool,
		// children: React.PropTypes.string,
		aside: React.PropTypes.node,
	}

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onClickAction = this.onClickAction.bind(this);
	}

	onClick() {
		this.props.onClick(this.props.onClickData);
	}

	onClickAction(e) {
		e.stopPropagation();
		this.props.onClickAction(this.props.onClickActionData);
	}

	render() {
		const { icon, children, disabled, aside, actionIcon } = this.props;

		return (
			<li className="ListItem" data-disabled={disabled} onClick={this.onClick}>
				{icon ? <div className="ListItem-icon">
					<Icon name={icon} />
				</div> : null}
				<div className="ListItem-content">
					{children}
					{aside ?
						<div className="ListItem-contentAside">{aside}</div>
					: null}
				</div>
				{actionIcon ?
				<div className="ListItem-actions" onClick={this.onClickAction}>
					<Icon name={actionIcon} />
				</div> : null}
			</li>
		);
	}
}

export default ListItem;
