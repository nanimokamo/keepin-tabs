import React, { Component } from 'react';

let newIndex = null;

const Sortable = (InnerComponent) => class extends Component {
	constructor(props) {
		super(props);

		this.state = {
			draggedOver: false,
		};

		this.handleDragEnd = this.handleDragEnd.bind(this);
		this.handleDragEnter = this.handleDragEnter.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	if (!prevProps.selected && this.props.selected) this.refs.container.scrollIntoView(false);
	// 	if (prevProps.flushDrop !== this.props.flushDrop) this.setState({ draggedOver: false });
	// }

	handleDragEnd(e) {
		e.persist();
		e.preventDefault();

		this.props.onDragEnd({
			id: this.props.id,
			newIndex: newIndex,
		});

		this.setState({ draggedOver: false });

		newIndex = null;
	}

	handleDragEnter() {
		if (!this.props.pinned) {
			newIndex = this.props.index;
			this.setState({ draggedOver: true });
		}
	}

	handleDragOver() {
		this.refs.container.scrollIntoView();
	}

	handleDrop(e) {
		e.preventDefault();
		this.setState({ draggedOver: false });
	}

	handleDragLeave(e) {
		if (newIndex != this.props.index) {
			this.setState({ draggedOver: false });
		}
	}

	setRef(e) {
		if (e) this.refs.container = e;
	}

	render() {
		return (
			<InnerComponent
				ref={this.setRef}
				draggable={true}
				onDragEnd={this.handleDragEnd}
				onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave}
				onDrop={this.handleDrop}
				onMouseUp={this.handleDrop}
				{...this.props}
			/>
		)
	}
}

export default (InnerComponent) => Sortable(InnerComponent);
