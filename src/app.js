import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TitleBar from './components/titlebar';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <span>
        <TitleBar />

        <div className="row">
          <div className="columns small-12">
            <br/>
            High...
          </div>
        </div>
      </span>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
