'use babel';

import React, { Component } from 'react';

export default class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: undefined,
      $player: undefined
    }
  }

  componentDidMount() {
    var $player = $('video');
    var player = $player[0];
    this.setState({player: player, $player: $player});
  }

  handleClick(event) {
    // Play and Pause when video element is clicked.
    this.state.$player.focus();

    if (this.state.$player.attr('src') != undefined) {
      if (this.state.player.paused == true) {
        this.state.player.play();
      } else if (this.state.player.paused == false) {
        this.state.player.pause();
      }
    } else {
      this.state.$player.prop('controls', true);
      this.state.$player.prop('src', this.props.dvd.file_url);
      this.state.$player.removeAttr('poster');
      this.state.player.play();
    }
  }


  handleDoubleClick(event) {
    event.preventDefault()
    event.stopPropagation()
    this.state.$player.focus()

    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (this.state.player.requestFullscreen) {
        this.state.player.requestFullscreen();
        this.state.$player.css('border',  'none');
      } else if (this.state.player.webkitRequestFullscreen) {
        this.state.player.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        this.state.$player.css('border',  'none');
      }
    } else {
      if (this.state.player.exitFullscreen) {
        this.state.player.exitFullscreen();
        this.state.$player.css('border',  '5px solid #475333');
      } else if (this.state.player.webkitExitFullscreen) {
        this.state.player.webkitExitFullscreen();
        this.state.$player.css('border',  '5px solid #475333');
      }
    }
  }

  handleWheel(event) {
    // Seek the video on scroll.
    console.log('onWheel event.deltaMode:', event.deltaMode, 'event.deltaY:', event.deltaY, 'event.deltaX:', event.deltaX);
    event.preventDefault();
    event.stopPropagation();
    this.state.$player.focus();

    if (event.deltaY < 0) {
      this.state.player.currentTime += 1;
    } else {
      this.state.player.currentTime -= 1;
    }
  }

  handleSpace(event) {
    this.state.$player.focus();
    event.preventDefault();
    event.stopPropagation();

    if (event.keyCode == 32 && this.state.player.paused == true) {
      this.state.player.play();
    } else if (event.keyCode == 32 && this.state.player.paused == false) {
      this.state.player.pause();
    }
  }

  handleArrows(event) {
    this.state.$player.focus();
    event.preventDefault();
    event.stopPropagation();

    // Scroll playback time forward and backward with the Arrow keys.
    if (event.keyCode == 39) {
      this.state.player.currentTime += 1
    } else if (event.keyCode == 37) {
      this.state.player.currentTime -= 1
    }
  }

  render() {
    return (
      <video
        id={this.props.dvd.id}
        className="player"
        poster={this.props.poster}
         preload="false"
        onClick={this.handleClick.bind(this)}
        onDoubleClick={this.handleDoubleClick.bind(this)}
        onWheel={this.handleWheel.bind(this)}
        onKeyUp={this.handleSpace.bind(this)}
        onKeyDown={this.handleArrows.bind(this)} />
    )
  }
}
