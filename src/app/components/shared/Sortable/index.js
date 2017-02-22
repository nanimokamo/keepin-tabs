import React from 'react';

import { otherProps } from '../../../utils.js';

const Sortable = (Component) => class Sortable extends React.Component {
	static propTypes = {
		onSortEnd: React.PropTypes.func,
		groupIndexes: React.PropTypes.array,
	}

	static childContextTypes = {
		onDragStart: React.PropTypes.func,
		onDragEnd: React.PropTypes.func,
		onDragOver: React.PropTypes.func,
	}

	state = {
		draggingIndex: undefined,
		draggedToIndex: undefined,
	}

	getChildContext() {
		return {
			onDragStart: this.onDragStart,
			onDragEnd: this.onDragEnd,
			onDragOver: this.onDragOver,
		};
	}

	constructor(props) {
		super(props);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
	}

	onDragStart(draggingIndex) {
		this.setState({ draggingIndex });
	}

	onDragEnd() {
		let draggedIndexes = [this.state.draggingIndex];
		
		if (this.props.groupIndexes.includes(this.state.draggingIndex)) {
			draggedIndexes = [
				...draggedIndexes,
				...this.props.groupIndexes.filter(index => index !== this.state.draggingIndex)
			];
		}

		this.props.onSortEnd({
			draggedIndexes,
			newIndex: this.state.draggedToIndex,
		});

		this.setState({
			draggingIndex: undefined,
			draggedToIndex: undefined,
		});
	}

	onDragOver(draggedToIndex) {
		this.setState({ draggedToIndex });
	}

	render() {
		return (
			<Component
				{...otherProps(Object.keys(this.constructor.propTypes), this.props)}
			/>
		);
	}
};

export default Sortable;
