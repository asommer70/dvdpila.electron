import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import PilaAPI from '../lib/pila_api';
var api = new PilaAPI();
import {remote, ipcRenderer} from 'electron';


export default class TitleBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ''
    }
  }

  componentWillMount() {
    var url = localStorage.getItem('url');
    if (url !== null) {
      this.setState({url: url});
    }
  }

  handleBackClick() {
    var page = localStorage.getItem('page');
    if (page == null) {
      page = 1;
    }
    hashHistory.push({
      pathname: '/dvds',
      query: { page: page }
    })
  }

  handleSearch(event) {
    if (event.keyCode == 13) {
      var term = event.target.value;

      console.log('term:', typeof(term));

      ipcRenderer.send('search', term);

      if (window.location.hash.split('/').length >= 3) {
        if (term == '') {
          ipcRenderer.send('search', term);
        } else {
          api.search(this.state.url, term, (data) => {
            hashHistory.push({
              pathname: '/dvds',
              state: {dvds: data.dvds, term: term}
            })
          });
        }
      }
    }
  }

  render() {
    return (
      <div className="titlebar" id="titleBar">
        <div className="title" id="title">
          DVD Pila!
        </div>
        <div className="row" id="titleLowerBar">
          <div className="columns small-3 float-left nav-section">
            <div className="button-group">
              <a className="button tiny nav-btn" onClick={this.handleBackClick.bind(this)}>Back</a>
            </div>
          </div>

          <div className="columns small-6 text-center add-dvd">
            <a className="button tiny">Add DVD</a>
          </div>

          <div className="columns small-3 float-right">
            <input className="input-group-field search" type="text" placeholder="Search" onKeyUp={this.handleSearch.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}
