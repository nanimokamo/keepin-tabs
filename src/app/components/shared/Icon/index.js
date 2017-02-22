import React from 'react';
import ICONS from './icons.js';

const Icon = ({ name, align, ...props }) => {
  return (
    <i
      {...props}
      className={`Icon ${props.className || ''} ${align ? 'Icon--aligned' : ''}`}
      data-name={name}
    >
      {ICONS[name]}
    </i>
  );
};

Icon.propTypes = {
  name: React.PropTypes.string,
  align: React.PropTypes.bool,
  className: React.PropTypes.string,
};

export default Icon;
