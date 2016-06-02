import React, { Component } from 'react';

export default class TitleBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="titlebar">
        <div className="title">
          DVD Pila!
        </div>
        <div className="row">
          <div className="columns small-4 float-right">
            <div className="input-group">
              <input className="input-group-field search" type="text" />
              <div className="input-group-button">
                <input type="submit" className="button search" value="Search" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
