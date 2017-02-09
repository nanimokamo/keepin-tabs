import React from 'react';

class WindowsItem extends React.Component {
	handleDragLeave() {
		this.props.onDragLeave(this.props.id);
	}

	handleDragEnter() {
		this.props.onDragEnter(this.props.id);
	}

	render() {
		const { name, draggedOver } = this.props;

		return (
			<div
				className={`WindowsItem ${draggedOver ? 'is-dragged-over' : ''}`}
				onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave}
			>
				{name}
			</div>
		);
	}
}

WindowsItem.propTypes = {
	// id: React.PropTypes.number,
	name: React.PropTypes.string,
	draggedOver: React.PropTypes.bool,
	onDragEnter: React.PropTypes.func,
	onDragLeave: React.PropTypes.func,
};

export default WindowsItem;
