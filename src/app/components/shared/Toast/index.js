import React from 'react';

class Toast extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickAction = this.handleClickAction.bind(this);
  }

  handleClickAction(e) {
    // e.persist();
    // this.setState({ isScrolled: e.target.scrollTop > 0 });
  }

  render() {
    const { text } = this.props;

    return (
      <div className="Toast">
        {text}
      </div>
    );
  }
}

export default Toast;
