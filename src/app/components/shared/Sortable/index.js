import React from 'react';

import { excludeProps } from '../../../utils.js';

const Sortable = (Component) => class Sortable extends React.Component {
	static propTypes = {
		onSortEnd: React.PropTypes.func,
		groupIndexes: React.PropTypes.array,
	}

	static childContextTypes = {
		onDragStart: React.PropTypes.func,
		onDragEnd: React.PropTypes.func,
		onDragOver: React.PropTypes.func,
		draggingIndexes: React.PropTypes.array,
	}

	state = {
		draggingIndex: undefined,
		draggingIndexes: [],
		draggedToIndex: undefined,
	}

	getChildContext() {
		return {
			onDragStart: this.onDragStart,
			onDragEnd: this.onDragEnd,
			onDragOver: this.onDragOver,
			draggingIndexes: this.state.draggingIndexes,
		};
	}

	constructor(props) {
		super(props);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
	}

	onDragStart(draggingIndex) {
		this.setState({
			draggingIndex,
			draggingIndexes: this.getDraggingIndexes(draggingIndex),
		});
	}

	getDraggingIndexes(draggingIndex) {
		let draggingIndexes = [draggingIndex];
		
		if (this.props.groupIndexes.includes(draggingIndex)) {
			draggingIndexes = [
				...draggingIndexes,
				...this.props.groupIndexes.filter(index => index !== draggingIndex)
			];
		}

		return draggingIndexes;
	}

	onDragEnd() {
		this.props.onSortEnd({
			draggedIndexes: this.getDraggingIndexes(this.state.draggingIndex),
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
				{...excludeProps(Object.keys(this.constructor.propTypes), this.props)}
			/>
		);
	}
};

export default Sortable;
