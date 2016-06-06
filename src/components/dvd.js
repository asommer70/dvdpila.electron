'use babel';

import React, { Component } from 'react';
import {remote, ipcRenderer} from 'electron';
import { Link, hashHistory } from 'react-router';
var moment = require('moment');
import TitleBar from './titlebar';
import Video from './video';
import PilaAPI from '../lib/pila_api';
var api = new PilaAPI();

export default class Dvd extends Component {
  constructor(props) {
    super(props);
    console.log('Dvd props.location.query.page:', props.location.query.page);

    this.state = {
      url: '',
      dvd: {}
    }
  }

  componentWillMount() {
    var url = localStorage.getItem('url');
    if (url !== null) {
      this.setState({url: url});
    }
  }

  componentDidMount() {
    api.getDvd(this.state.url, this.props.params.id, (data) => {
      console.log('data:', data);
      this.setState({dvd: data});
    });
  }

  render() {
    var dvd = this.state.dvd;
    return (
      <span>
      <div className="row main dvd-container">
        <div className="small-4 columns dvd-info">
          <br/>

          <img src={dvd.image_url} className='thumbnail'/>

          <br/><br/>

          <ul className="dvd-attr no-bullet">
            <li>
              <strong>Title: </strong>
              {dvd.title}
            </li>
            <li>
              <strong>Created: </strong>
              {moment(dvd.created_at).fromNow()} ago
            </li>
            <li>
              <strong>Rating: </strong>
              {dvd.rating}
            </li>
            <li>
              <strong>Info: </strong>
              {dvd.abstract_txt}
            </li>
          </ul>
        </div>

        <div className="small-8 columns text-center">
          <br/>
          <div className="player-div">
            <Video poster={this.state.url + '/img/dvdpila_poster.png'} dvd={dvd} />
          </div>

          <br/><hr/><br/>
        </div>
      </div>
      </span>
    );
  }
}
