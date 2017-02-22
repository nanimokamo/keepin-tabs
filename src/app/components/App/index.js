import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import Bookmarks from '../Bookmarks';
import Tabs from '../Tabs';
import Windows from '../Windows';
import NotificationManager from '../NotificationManager';

import { keyPressed } from '../../store/actions.js';

class App extends Component {
  static propTypes = {
    keyPressed: React.PropTypes.func,
  }
  
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    this.props.keyPressed(e); 
  }

  render() {
    return (
      <main className="App">
        <Header />
        <Windows />
        <Bookmarks />
        <NotificationManager />

        <div className="AppContent">
          <div className="AppContent-inner">
            <Tabs />
          </div>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = {
  keyPressed,
};

const mapStateToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(App);
