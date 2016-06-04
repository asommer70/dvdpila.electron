'use babel';

import React, { Component } from 'react';
import {remote, ipcRenderer} from 'electron';
import { Link, hashHistory } from 'react-router'
import TitleBar from './titlebar';
import PilaAPI from '../lib/pila_api';
var api = new PilaAPI();

export default class Dvd extends Component {
  constructor(props) {
    super(props);

    console.log('dvd props.history:', props.history);
    this.props = props;
    // listen for route event and send back history?
  }

  componentDidMount() {
    // Send route object to title bar?
    ipcRenderer.send('routed', this.props.history);
  }

  render() {
    return (
      <span>
        <div className="row">
          <div className="columns small-12">
            <strong>DVD: </strong> {this.props.params.id}
          </div>
        </div>
      </span>
    );
  }
}
