'use babel';

import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import TitleBar from './titlebar';
import PilaAPI from '../lib/pila_api';
var api = new PilaAPI();

export default class Dvd extends Component {
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
