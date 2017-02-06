import React from 'react';
import Icon from '../Icon';

class BottomSheet extends React.Component {
	constructor(props) {
		super(props)
		this.state = { isScrolled: false };
		this.handleScroll = this.handleScroll.bind(this);
	}

	handleScroll(e) {
		e.persist();
		this.setState({ isScrolled: e.target.scrollTop > 0 });
	}

	render() {
		const { isScrolled } = this.state;
		const { children, title, onClickCover, onClickBack, showBack, open } = this.props;

		return (
			<div className={`BottomSheet ${open ? 'is-open' : ''} ${isScrolled ? 'is-scrolled' : ''}`}>
				<div className="BottomSheet-cover" onClick={onClickCover} />
				<div className="BottomSheet-wrapper">
					{title ?
						<div className="BottomSheet-title">
							<Icon
								className={`BottomSheet-nav ${showBack ? '' : 'is-hidden'}`}
								name="back"
								onClick={onClickBack}
							/>
							{title}
						</div>
					: null}
					{open ?
						<div
							className="BottomSheet-content"
							onScroll={this.handleScroll}
						>
							{children}
						</div>
					: null}
				</div>
			</div>
		);
	}
}

export default BottomSheet;
