'use babel';

import React, { Component } from 'react';
import {remote, ipcRenderer} from 'electron';
import { Link } from 'react-router'
import Pagination from './pagination';
import PilaAPI from '../lib/pila_api';
var api = new PilaAPI();

export default class Dvds extends Component {
  constructor(props) {
    super(props);

    console.log('dvds props:', props);

    this.state = {
      dvds: [],
      url: '',
      totalPages: 1,
      currentPage: 1,
      pages: [1]
    }
  }

  componentWillMount() {
    ipcRenderer.on('settings-update', () => {
      var url = localStorage.getItem('url');
      this.setState({url: url});
      console.log('localStorage url:', url);
    });

    ipcRenderer.on('search', (event, term) => {
      console.log('term:', term);
      if (term === '') {
        console.log('Getting first page...');
        api.getDvds(this.state.url, 1, (data) => {
          this.setState({dvds: data.dvds});
        });
      } else {
        api.search(this.state.url, term, (data) => {
          this.setState({dvds: data.dvds});
        });
      }
    });


    var url = localStorage.getItem('url');
    if (url !== null) {
      this.setState({url: url});
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(['search']);
  }

  componentDidMount() {
    var page;
    if (localStorage.getItem('page') !== null) {
      page = localStorage.getItem('page');
    } else {
      page = 1;
    }

    if (this.props.location.state !== null) {
      if (this.props.location.state.dvds !== null) {
        console.log('this.props.location.state:', this.props.location.state);
        this.setState({dvds: this.props.location.state.dvds});
      }
    } else {
      api.getDvds(this.state.url, page, (data) => {
        console.log('data:', data);
        var pages = Array.apply(null, Array(9)).map(function (_, i) {return i;});
        this.setState({dvds: data.dvds, totalPages: data.count / 10, pages: pages});
      });
    }
  }

  paginate() {
    console.log('this.state.page:', this.state.pages, 'this.state.currentPage:', this.state.currentPage);
    for (var i = 1; i < this.state.pages; i++) {
      console.log('i:', i);
      return (
        <li key={i}><a href="#" onClick={this.handlePageClick.bind(this)} data-page={i} aria-label="Page {i}">{i}</a></li>
      )
    }
  }

  handlePageClick(event) {
    console.log('pageClick event.target:', $(event.target).data().page);
    var page = $(event.target).data().page;
    localStorage.setItem('page', page);
    api.getDvds(this.state.url, page, (data) => {
      // var pages = Array.apply(null, Array(page + )).map(function (_, i) {return i;});
      var pages = [];
      for (var i = page; i < page + 10; i++) {
        pages.push(i);
      }
      this.setState({dvds: data.dvds, currentPage: page, pages: pages});
    });
  }

  render() {
    return (
      <span>
      <div className="row">
        <div className="columns">
          <div className={this.state.dvds.length == 0 ? "no-results" : "no-results hide" }>
            No results found for: {this.props.location.state !== null ? this.props.location.state.term : 'DVDs'}
          </div>
          <div className="dvds-list row small-up-5">

            {this.state.dvds.map((dvd, idx) => {
              return (
                <div className="column text-center" key={dvd.id}>
                  <Link to={`dvds/${dvd.id}?page=${this.state.currentPage}`}>
                    <img
                      src={dvd.image_url ? dvd.image_url : localStorage.getItem('url') + '/img/dvdpila_poster.png'}
                      data-tooltip
                      aria-haspopup="true"
                      className={idx < 5 ? "thumbnail has-tip dvd-image" : "thumbnail has-tip top dvd-image"}
                      data-disable-hover="false"
                      tabindex="1"
                      title={dvd.abstract_txt}
                    />
                  </Link>

                  <div className="dvd-title">
                    <Link to={`dvds/${dvd.id}?page=${this.state.currentPage}`}>{dvd.title}</Link>
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

        <div className="row pager">
          <div className="columns small-11">
            <Pagination
              currentPage={this.state.currentPage}
              pages={this.state.pages}
              totalPages={this.state.totalPages}
              handleClick={this.handlePageClick}
            />
          </div>
        </div>
      </div>

      </span>
    )
  }
}
