import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { setWindowsVisibility, addSelectedTabsToWindow } from '../../actions.js';
import { getWindows } from '../../utils.js';
import { getIsDragging } from '../../selectors.js';

// import BottomSheet from '../BottomSheet';
// import Icon from '../Icon';
// import WindowsItem from '../WindowsItem';

class Windows extends React.Component {
	state = {
		windows: [],
	};

	constructor(props) {
		super(props);

		this.goToWindow = this.goToWindow.bind(this);
		this.addToWindow = this.addToWindow.bind(this);
	}

	componentDidMount() {
		this.getWindows();
	}

	async getWindows() {
		const windows = await getWindows();
		this.setState({ windows });
	}

	goToWindow(id) {
		// this.getWindows(id);
	}

	addToWindow(e, id) {
		// console.log('adding to Window');
		// this.props.addSelectedTabsToWindow(id);
		// this.props.hideWindows();
	}

	render() {
		const { windows } = this.state;
		// const { open } = this.props;

		return (
			<div className="Windows">
				{windows && windows.length ?
					windows.map((w, i) => {
						return (
							<div
								className="WindowsItem"
								key={w.id}
							>
								{i}
							</div>
						);
					})
				: null}

				<div className="WindowsItem">
					+
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	// hideWindows() {
	// 	dispatch(setWindowsVisibility(false));
	// },
	// addSelectedTabsToWindow(id) {
	// 	dispatch(addSelectedTabsToWindow(id));
	// },
});

const mapStateToProps = (state) => createStructuredSelector({
	// open: getIsDragging,
});

export default connect(mapStateToProps, mapDispatchToProps)(Windows);
