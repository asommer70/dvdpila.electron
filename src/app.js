import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import {remote, ipcRenderer} from 'electron';

import TitleBar from './components/titlebar';
import PilaAPI from './lib/pila_api';
var api = new PilaAPI();

class App extends Component {
  constructor() {
    super();

    ipcRenderer.on('toggle-settings', () => {
      var url = localStorage.getItem('url');
      console.log('localStorage url:', url);
    });
  }

  render() {
    return (
      <span>
        <TitleBar />

        <div className="row">
          <div className="columns small-12">
            <br/>
            High...
          </div>
        </div>
      </span>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
