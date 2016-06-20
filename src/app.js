'use babel';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';

import {remote, ipcRenderer} from 'electron';

import TitleBar from './components/titlebar';
import Dvds from './components/dvds';
import Dvd from './components/dvd';

// remote.BrowserWindow.addDevToolsExtension("/Users/adam/Library/Application\ Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.14.11_0");
remote.BrowserWindow.addDevToolsExtension('/Users/adam/work/react_dev_tools');

class App extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <span>
        <TitleBar />
        <div className="main">
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
