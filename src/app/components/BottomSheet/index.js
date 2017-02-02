import React from 'react';

const BottomSheet = ({ children, title }) => {
	return (
		<div className="BottomSheet">
			<div className="BottomSheet-cover"></div>
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
