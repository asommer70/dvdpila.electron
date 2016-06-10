'use babel';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';

import {remote, ipcRenderer} from 'electron';

import TitleBar from './components/titlebar';
import Dvds from './components/dvds';
import Dvd from './components/dvd';

class App extends Component {
  componentWillMount() {
    ipcRenderer.on('resize', (event, bounds) => {
      $($('.row.main').children()[0]).css('height', bounds.height);
    });

    $($('.row.main').children()[0]).css('height', window.innerHeight - 70 + 'px');
  }

  render() {
    return (
      <span>
        <TitleBar />
        <div className="row main">
          {this.props.children || <Dvds />}
        </div>
      </span>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dvds}/>
      <Route path="/dvds" name="dvds" component={Dvds}/>
      <Route path="/dvds/:id" name="dvd" component={Dvd}/>
    </Route>
  </Router>
), document.getElementById('app'))
