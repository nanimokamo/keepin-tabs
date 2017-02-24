import React from 'react';

import { excludeProps } from '../../../utils.js';

const Sortable = (Component) => class Sortable extends React.Component {
	static propTypes = {
		onSortEnd: React.PropTypes.func,
		groupIndexes: React.PropTypes.array,
	}

	state = {
		draggingIndex: undefined,
		draggingIndexes: [],
		draggedToIndex: undefined,
	}

	static childContextTypes = {
		onDragStart: React.PropTypes.func,
		onDragEnd: React.PropTypes.func,
		onDragOver: React.PropTypes.func,
		draggingIndexes: React.PropTypes.array,
		isActive: React.PropTypes.bool,
	}

	getChildContext() {
		return {
			onDragStart: this.onDragStart,
			onDragEnd: this.onDragEnd,
			onDragOver: this.onDragOver,
			draggingIndexes: this.state.draggingIndexes,
			isActive: this.state.draggingIndexes.length > 0,
		};
	}

	constructor(props) {
		super(props);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
	}

	onDragStart(draggingIndex) {
		console.log('indexes being dragged', this.getDraggingIndexes(draggingIndex));
		this.setState({
			draggingIndex,
			draggingIndexes: this.getDraggingIndexes(draggingIndex),
		});
	}

	getDraggingIndexes(draggingIndex) {
		const draggingIndexes = do {
			if (this.props.groupIndexes.includes(draggingIndex)) {
				[
					draggingIndex,
					...this.props.groupIndexes.filter(index => index !== draggingIndex)
				];
			} else {
				[draggingIndex];
			}
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
			draggingIndexes: [],
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
