import React, { Component } from 'react';
import { hashHistory } from 'react-router'


export default class TitleBar extends Component {
  constructor(props) {
    super(props);
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
            <input className="input-group-field search" type="text" placeholder="Search" />
          </div>
        </div>
      </div>
    );
  }
}
