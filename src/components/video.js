'use babel';

import React, { Component } from 'react';

export default class Video extends Component {
  constructor(props) {
    super(props);

    console.log('Video props:', props);

    this.state = {
      player: undefined,
      $player: undefined,
      file_url: null,
      url: '',
      type: ''
    }
  }

  componentWillReceiveProps() {
    var file_url, url, type, $player;
    if (this.props.episode !== null) {
      $player = $('#' + this.props.episode.id);
      file_url = this.props.episode.file_url;
      url = this.props.episode.url;
      type = 'episode'
    } else {
      $player = $('#' + this.props.dvd.id);
      // $player = $('.player');

      // console.log('$player:', $player);
      console.log('rendering Video... this.props.dvd:', this.props.dvd, 'this.props.episode:', this.props.episode);

      file_url = this.props.dvd.file_url;
      url = this.props.dvd.url;
      type = 'dvd'
    }
    var player = $player[0];

    this.setState({player: player, $player: $player, file_url: file_url, url: url, type: type}, () => {
      // Map the space bar.
      this.state.$player.on('focus', (event) => {
        $(window).on('keydown', (e) => {
          return !(e.keyCode == 32);
        });
      });

      // Re-enable space bar.
      this.state.$player.on('blur', (e) => {
        $(window).off('keydown');
      });

      this.state.$player.on('ended', (e) => {
        console.log('Video has ended...');

        //
        // $.ajax({
        //   url: url,
        //   method: 'put',
        //   data: 'dvd[playback_time]=' + 0
        // })
      });

      // Save playback_time when paused.
      this.state.$player.on('pause', (e) => {
        this.state.$player.focus();

        // Do some Maths on the playback time.
        var videoTime = this.getVideoTime(this.state.player.currentTime);

        // Update timer fields.
        // $.each $('.timer'), (idx, timer) ->
        //   $timer = $(timer)
        //   $timer.val(videoTime)

          // # Set the first Option in the Bookmark dropdown's text.
          // if $timer.prop('nodeName') == 'OPTION'
          //   $timer.text(Math.floor(videoTime))

        // Do the putting.
        // $.ajax({
        //   url: url,
        //   method: 'put',
        //   data: type + '[playback_time]=' + videoTime
        // }).then (dvd) ->
        //   $('.player').on 'play', (e) ->
        //     play_location(this)
      });

      // # Start playing at the playback_time.
      this.state.$player.on('play', (e) => {
        this.state.$player.focus();
        this.playLocation(this);
      });
    });
  }

  handleClick(event) {
    // Play and Pause when video element is clicked.
    console.log('clicked... this.state:', this.state);
    console.log('event.target:', event.target);
    this.state.$player.focus();

    if (this.state.$player.attr('src') != undefined) {
      if (this.state.player.paused == true) {
        this.state.player.play();
      } else if (this.state.player.paused == false) {
        this.state.player.pause();
      }
    } else {
      this.state.$player.prop('controls', true);
      this.state.$player.prop('src', this.state.file_url);
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

  getVideoTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(time / 60);
    if (minutes > 59) {
      minutes = Math.floor(time / 60) - 60;
    }

    var seconds = Math.round(time - minutes * 60);
    if (seconds > 3599) {
      seconds = Math.round(time - minutes * 60) - 3600;
    }

    return time
  }

  playLocation() {
    console.log('playLocation...');
    this.state.$player.focus();
    var videoTime = this.getVideoTime(this.state.player.currentTime);

    // $.get(url).then (data) ->
    //   self.currentTime = data.playback_time
    //   self.play()
  }

  render() {
    console.log('Video render this.props:', this.props);
    return (
      <video
        id={this.props.episode === null ? this.props.dvd.id : this.props.episode.id}
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
