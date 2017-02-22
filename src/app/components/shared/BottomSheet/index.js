import React from 'react';
import Icon from '../Icon';

class BottomSheet extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    title: React.PropTypes.string,
    onClickCover: React.PropTypes.func,
    open: React.PropTypes.bool,
    footnote: React.PropTypes.node,
    onClickBack: React.PropTypes.func,
    showBack: React.PropTypes.bool,
  }
  
  state = {
    isScrolled: false
  };
  
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
    const { children, title, onClickCover, onClickBack, showBack, open, footnote } = this.props;

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
          <div
            className="BottomSheet-content"
            onScroll={this.handleScroll}
          >
            {children}
          </div>
          {footnote ?
            <div className="BottomSheet-footnote">
              {footnote}
            </div>
          : null}
        </div>
      </div>
    );
  }
}

export default BottomSheet;
