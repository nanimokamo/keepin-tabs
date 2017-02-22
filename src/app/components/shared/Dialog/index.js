import React from 'react';

class Dialog extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    title: React.PropTypes.string,
    onClickCover: React.PropTypes.func,
    open: React.PropTypes.bool,
    footnote: React.PropTypes.node,
  }

  state = {
    isScrolled: false
  }

  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(e) {
    e.persist();
    this.setState({ isScrolled: e.target.scrollTop > 0 });
  }

  render() {
    const { isScrolled } = this.state;
    const { children, title, onClickCover, open, footnote } = this.props;

    return (
      <div className={`Dialog ${open ? 'is-open' : ''} ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="Dialog-cover" onClick={onClickCover} />
        <div className="Dialog-wrapper">
          {title ?
            <div className="Dialog-title">
              {title}
            </div>
          : null}
          <div
            className="Dialog-content"
            onScroll={this.handleScroll}
          >
            {children}
          </div>
          {footnote ?
            <div className="Dialog-footnote">
              {footnote}
            </div>
          : null}
        </div>
      </div>
    );
  }
}

export default Dialog;
