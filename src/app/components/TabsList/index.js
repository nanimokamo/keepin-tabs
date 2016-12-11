import React, { Component } from 'react';

class TabsList extends Component {
	constructor(props) {
		super(props);
		this.handleDragOver = this.handleDragOver.bind(this);
	}

	handleDragOver(e) {
		e.persist();
	}

	render() {
		return (
			<ul className={`TabsList TabsList--view-${this.props.view}`} onDragOver={this.handleDragOver}>
				{this.props.children}
			</ul>
		)	
	}
};

export default TabsList;
