import React, { Component } from 'react';

export default class EpisodeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: this.props.episode
    }
  }

  handleFieldChange(event) {
    var episode = this.state.episode;

    switch (event.target.id) {
      case 'episode_name':
        episode.name = event.target.value;
        break;
      case 'episode_file_url':
        episode.file_url = event.target.value;
        break;
    }

    this.setState(episode);
  }

  componentDidMount() {
    $(document).foundation();
  }

  render() {
    return (
      <span>
        <button className="button tiny" data-toggle={"episodeForm" + this.state.episode.id}>Edit Episode</button>

        <div id={"episodeForm" + this.state.episode.id} data-toggler=".hide" className="edit-episode hide">
          <form name="episodeForm" method="post" action={this.props.url + '/episodes/' + this.state.episode.id}>
              <div className="row">
                <div className="columns large-6">
                  <label for="name">Name</label>
                  <input
                    placeholder="Name"
                    type="text"
                    value={this.state.episode.name}
                    name="episode[name]"
                    id="episode_name"
                    onChange={this.handleFieldChange.bind(this)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="columns large-6">
                  <label for="episode_file_url">File URL</label>
                  <input
                    placeholder="File URL"
                    type="text"
                    value={this.state.episode.file_url}
                    name="episode[file_url]"
                    id="episode_file_url"
                    onChange={this.handleFieldChange.bind(this)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="columns large-6">
                  <button name="button" type="submit" className="button tiny success">
                    Save Episode
                  </button>
                </div>
              </div>
          </form>

          <a className="delete" rel="nofollow" data-method="delete" href={"/episodes/" + this.state.episode.id}>Delete Episode</a>
        </div>
      </span>
    )
  }
}
