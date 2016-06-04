import React, { Component } from 'react';

export default class TitleBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: {}
    }
  }

  componentDidMount() {
    // Listen for route event and receive history object.
    ipcRenderer.on('routed', (event, history) => {
      console.log('ipcRenderer.on routed history:', history);
      this.setState({history: history})
    });
  }

  handleBackClick() {
    // console.log('this.context.router:', this.props);
    console.log('this.state.history:', this.state.history);
    // Send route event?
    this.state.history.goBack();
    // console.log(this.context.router.push(path))
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
