import React from 'react';
import Icon from '../Icon';

class BottomSheet extends React.Component {
	componentDidMount() {

	}

	render() {
		const { children, title, onClickCover, onClickBack, showBack, open } = this.props;

		return (
			<div className={`BottomSheet ${open ? 'is-open' : ''}`}>
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
						<div className="BottomSheet-content">
							{children}
						</div>
					: null}
				</div>
			</div>
		);
	}
}

export default BottomSheet;
