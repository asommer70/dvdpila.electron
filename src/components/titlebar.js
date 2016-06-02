import React, { Component } from 'react';

export default class TitleBar extends Component {
  constructor() {
    super();
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
              <a className="button tiny nav-btn">Back</a>
              <a className="button tiny nav-btn">Forward</a>
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
