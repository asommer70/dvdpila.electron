'use babel';

import React, { Component } from 'react';

export default class Video extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(event) {
    // Play and Pause when video element is clicked.
    var player = event.target;
    var $player = $(player);
    $player.focus();

    console.log('$player:', $player, 'player:', player);

    if ($player.attr('src') != undefined) {
      if (player.paused == true) {
        player.play();
      } else if (player.paused == false) {
        player.pause();
      }
    } else {
      $player.prop('controls', true);
      $player.prop('src', this.props.dvd.file_url);
      $player.removeAttr('poster');
      player.play();
    }
  }

  render() {
    return (
      <video id={this.props.dvd.id} className="player" poster={this.props.poster} preload="false" onClick={this.handleClick.bind(this)} />
    )
  }
}
