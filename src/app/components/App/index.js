import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from '../Header';
import Bookmarks from '../Bookmarks';
import Tabs from '../Tabs';
import Windows from '../Windows';

import { getWindowsVisibility } from '../../selectors.js'
import { keyPressed } from '../../actions.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown(e) {
		this.props.keyPressed(e.code);	
	}

	render() {
		const { windowsVisible } = this.props;

		return (
			<main className={`App ${windowsVisible ? 'sidenav-is-open' : ''}`}>
				<Header />
				<Windows />
				<Bookmarks />

				<div className="AppContent">
					<div className="AppContent-inner">
						<Tabs />
					</div>
				</div>
			</main>
		);
	}
}

App.propTypes = {
	keyPressed: React.PropTypes.func,
	isDragging: React.PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
	keyPressed(key) {
		dispatch(keyPressed(key));
	},
});

const mapStateToProps = createStructuredSelector({
	windowsVisible: getWindowsVisibility,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
