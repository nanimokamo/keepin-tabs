import React from 'react';

import Icon from '../Icon';

const IconButton = (props) => {
	return (
		<button {...props} className={`IconButton ${props.className || ''}`}>
			<Icon name={props.icon} />
		</button>
	)
};

export default IconButton;
