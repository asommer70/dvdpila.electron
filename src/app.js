'use babel';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';

import {remote, ipcRenderer} from 'electron';

import TitleBar from './components/titlebar';
import Dvds from './components/dvds';
import Dvd from './components/dvd';

class App extends Component {
  render() {
    return (
      <span>
        <TitleBar />
        {this.props.children || <Dvds />}
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
