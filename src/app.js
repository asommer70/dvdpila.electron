'use babel';

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

    this.state = {
      dvds: [],
      url: ''
    }
  }

  componentWillMount() {
    ipcRenderer.on('settings-update', () => {
      var url = localStorage.getItem('url');
      this.setState({url: url});
      console.log('localStorage url:', url);
    });

    var url = localStorage.getItem('url');
    if (url !== null) {
      this.setState({url: url});
    }
  }

  componentDidMount() {
    api.getDvds(this.state.url, (data) => {
      console.log('data:', data);
      this.setState({dvds: data.dvds});
    });
  }

  render() {
    return (
      <span>
        <TitleBar />

        <br/>

        <div className="row">
          <div className="columns small-12">
            <div className={this.state.dvds.length == 0 ? "no-results text-center" : "no-results text-center hide" }>Getting DVDs...</div>
            <div className="dvds-list row small-up-5">
              {this.state.dvds.map((dvd, idx) => {
                return (
                  <div className="column text-center" key={dvd.id}>
                    <img
                      src={dvd.image_url ? dvd.image_url : localStorage.getItem('url') + '/img/dvdpila_poster.png'}
                      data-tooltip
                      aria-haspopup="true"
                      className={idx < 5 ? "thumbnail has-tip" : "thumbnail has-tip top"}
                      data-disable-hover="false"
                      tabindex="1"
                      title={dvd.abstract_txt}
                    />

                    <div className="dvd-title">
                      <a href={`#dvds/${dvd.id}`}>{dvd.title}</a>
                    </div>

                    {dvd.tags.map((tag, idx) => {
                      <span className="label info" key={idx}>{tag}</span>
                    })}
                    {dvd.tags.length > 2 ? '<span class="label info">...</span>' : ''}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </span>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
