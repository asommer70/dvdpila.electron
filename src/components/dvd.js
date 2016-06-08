'use babel';

import React, { Component } from 'react';
import {remote, ipcRenderer} from 'electron';
import { Link, hashHistory } from 'react-router';
var moment = require('moment');
import TitleBar from './titlebar';
import Video from './video';
import EpisodeForm from './episode_form';
import PilaAPI from '../lib/pila_api';
var api = new PilaAPI();

export default class Dvd extends Component {
  constructor(props) {
    super(props);

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
      console.log('getDvd data:', data);
      this.setState({dvd: data});
    });
  }

  render() {
    var dvd = this.state.dvd;

    var videos;
    if (dvd.file_url == null && this.state.episodes != null) {
      videos = (
        <ul className="episodes no-bullet">
          {
            dvd.episodes.map((episode) => {
              return (
                <li key={episode.id}>
                  <div className="episode">
                    <p><strong>Name:</strong> {episode.name}</p>

                    <div className="player-div">
                      <Video poster={this.state.url + '/img/dvdpila_poster.png'} dvd={dvd} episode={episode} />
                      <br/>

                      <EpisodeForm episode={episode} url={this.state.url} />

                      <hr/>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      )
    } else {
      console.log('dvd:', dvd);

      videos = <div className="player-div"><Video poster={this.state.url + '/img/dvdpila_poster.png'} dvd={dvd} episode={null} /></div>;
    }

    // console.log('videos:', videos);

    return (
      <span>
      <div className="row main dvd-container">
        <div className="small-4 columns dvd-info">
          <br/>

          <img src={dvd.image_url} className="thumbnail"/>

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

        <div className="small-8 columns">
          <br/>
          {videos}
          <br/><hr/><br/>
        </div>
      </div>
      </span>
    );
  }
}
