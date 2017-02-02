import React from 'react';

const BottomSheet = ({ children, title, onClickCover }) => {
	return (
		<div className="BottomSheet">
			<div className="BottomSheet-cover" onClick={onClickCover} />
			<div className="BottomSheet-wrapper">
				{title ?
					<div className="BottomSheet-title">
						{title}
					</div>
				: null}
				<div className="BottomSheet-content">
					{children}
				</div>
			</div>
		</div>
	);
};

export default BottomSheet;
