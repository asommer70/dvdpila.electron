import React, { Component } from 'react';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="pagination text-center" role="navigation" aria-label="Pagination">
        <li className="pagination-previous disabled">Previous</li>
        <li className="current" onClick={this.props.handleClick.bind(this)}>1</li>
        <li><a href="#" aria-label="Page 2">2</a></li>
        <li><a href="#" aria-label="Page 3">3</a></li>
        <li><a href="#" aria-label="Page 4">4</a></li>
        <li className="ellipsis"></li>
        <li className="pagination-next"><a href="#" aria-label="Next page">Next</a></li>
      </ul>
    )
  }
}
