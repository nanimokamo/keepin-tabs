import React from 'react';

import { otherProps } from '../../../../utils.js';

const SortableItem = (Component) => class SortableItem extends React.Component {
	static propTypes = {
		index: React.PropTypes.number,
		collection: React.PropTypes.string,
	}

	static contextTypes = {
		onDragStart: React.PropTypes.func,
		onDragEnd: React.PropTypes.func,
		onDragOver: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
	}

	onDragStart(e) {
		// console.log('onDragStart', this.props.index);
		e.dataTransfer.setDragImage(document.createElement('div'), -99999, -99999);
		this.context.onDragStart(this.props.index)
	}

	onDragEnd() {
		// console.log('onDragEnd', this.props.index);
		this.context.onDragEnd(this.props.index)
	}

	onDragOver() {
		// console.log('onDragOver', this.props.index);
		this.context.onDragOver(this.props.index)
	}

	render() {
		return (
			<Component
				{...otherProps(Object.keys(this.constructor.propTypes), this.props)}
				onDragStart={this.onDragStart}
				onDragEnd={this.onDragEnd}
				onDragOver={this.onDragOver}
				draggable
			/>
		);
	}
};

// TwoLineList.propTypes = {
// 	// children: React.PropTypes.func,
// 	className: React.PropTypes.string,
// 	view: React.PropTypes.string,
// };

export default SortableItem;
