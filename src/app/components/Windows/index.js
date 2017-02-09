import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import WindowsItem from '../WindowsItem';

import { getWindows, goToWindow } from '../../utils.js';

class Windows extends React.Component {
	state = {
		draggedOverId: null,
		windows: [],
	};

	constructor(props) {
		super(props);
		this.goToWindow = this.goToWindow.bind(this);
		this.addToWindow = this.addToWindow.bind(this);
		this.handleDragEnter = this.handleDragEnter.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
		this.renderWindowsItem = this.renderWindowsItem.bind(this);
		this.renderNewWindowsItem = this.renderNewWindowsItem.bind(this);
	}

	componentDidMount() {
		this.getWindows();
	}

	handleDragEnter(id) {
		console.log('drag enter');
		this.setState({ draggedOverId: id });
	}

	handleDragLeave() {
		console.log('drag leave');
		this.setState({ draggedOverId: null });
	}

	async getWindows() {
		const windows = await getWindows();
		this.setState({ windows });
	}

	goToWindow(id) {
		goToWindow(id);
	}

	addToWindow(e, id) {
	}

	renderWindowsItem(props, i) {
		return (
			<WindowsItem
				{...props}
				key={props.id}
				name={`${i}`}
				draggedOver={this.state.draggedOverId === props.id}
				onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave}
			/>
		);
	}

	renderNewWindowsItem() {
		return (
			<WindowsItem
				id="new"
				name="+"
				draggedOver={this.state.draggedOverId === 'new'}
				onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave}
			/>
		);
	}

	render() {
		const { windows } = this.state;

		return (
			<div className="Windows">
				{windows && windows.length ?
					windows.map(this.renderWindowsItem)
				: null}

				{this.renderNewWindowsItem()}
			</div>
		);
	}
}

Windows.propTypes = {
};

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, mapDispatchToProps)(Windows);
