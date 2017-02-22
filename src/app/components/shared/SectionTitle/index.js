import React from 'react';

const SectionTitle = ({ children }) => <div className="SectionTitle">{children}</div>;

SectionTitle.propTypes = {
  children: React.PropTypes.node,
};

export default SectionTitle;
