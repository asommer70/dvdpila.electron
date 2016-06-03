'use babel';

import React, { Component } from 'react';
import { Link } from 'react-router'
import PilaAPI from '../lib/pila_api';
var api = new PilaAPI();

export default class Dvds extends Component {
  constructor() {
    super();

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

    var url = localStorage.getItem('url');
    if (url !== null) {
      this.setState({url: url});
    }
  }

  componentDidMount() {
    api.getDvds(this.state.url, 1, (data) => {
      console.log('data:', data);
      var pages = Array.apply(null, Array(9)).map(function (_, i) {return i;});
      this.setState({dvds: data.dvds, totalPages: data.count / 10, pages: pages});
    });
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
                    <Link to={`dvds/${dvd.id}`}>{dvd.title}</Link>
                  </div>

                  {dvd.tags.map((tag, idx) => {
                    <span className="label info" key={idx}>{tag}</span>
                  })}
                  {dvd.tags.length > 2 ? '<span class="label info">...</span>' : ''}
                </div>
              )
            })}
          </div>

          <ul className="pagination text-center" role="navigation" aria-label="Pagination">
            <li className="pagination-previous">
              <a data-page={this.state.currentPage - 1 <= 0 ? this.state.pages.length : this.state.currentPage - 1}
                onClick={this.handlePageClick.bind(this)}
                href="#"
                aria-label="Previous page">
                Previous
              </a>
            </li>

            <li className={this.state.currentPage >= 9 ? "" : "hide"}>
              <a href="#" onClick={this.handlePageClick.bind(this)} data-page="1" aria-label="Page 1">1</a>
            </li>
            <li className={this.state.currentPage >= 9 ? "" : "hide"}>
              <a href="#" onClick={this.handlePageClick.bind(this)} data-page="2" aria-label="Page 2">2</a>
            </li>
            <li className={this.state.currentPage >= 9 ? "ellipsis" : "ellipsis hide"}></li>

            {this.state.pages.map((i) => {
              i++;
              return <li key={i}><a href="#" onClick={this.handlePageClick.bind(this)} data-page={i} aria-label="Page {i}">{i}</a></li>
            })}

            <li className={this.state.currentPage >= this.state.totalPages - 10 ? "ellipsis hide" : "ellipsis"}></li>
            <li className={this.state.currentPage >= this.state.totalPages - 10 ? "hide" : ""}>
              <a href="#" onClick={this.handlePageClick.bind(this)} data-page={this.state.totalPages - 1} aria-label="Page {this.state.totalPages - 1}">
                {this.state.totalPages - 1}
              </a>
            </li>
            <li className={this.state.currentPage >= this.state.totalPages - 10 ? "hide" : ""}>
              <a href="#" onClick={this.handlePageClick.bind(this)} data-page={this.state.totalPages} aria-label="Page {this.state.totalPages}">
                {this.state.totalPages}
              </a>
            </li>

            <li className="pagination-next">
              <a data-page={this.state.currentPage + 1 > this.state.pages.length ? 1 : this.state.pages.length}
                onClick={this.handlePageClick.bind(this)}
                href="#"
                aria-label="Next page">
                Next
              </a>
            </li>
          </ul>

        </div>
      </div>
    )
  }
}
