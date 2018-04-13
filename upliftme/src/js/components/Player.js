import React, {Component} from 'react';
import PropTypes from 'prop-types'
import '../../styles/Player.css';

class Player extends Component {

  static propTypes = {
    playlist : PropTypes.array.isRequired
  }

  static defaultProps = {
    playlist: []
  }



  constructor(props){
    super(props);


    this.state = {
      activeMusicIndex: 0,

      is_playing: false
    };
  }

  togglePlay(){

    this.setState({is_playing: !this.state.is_playing});
  }

  removeSong(){
  alert("Song will be removed");

}

  render() {

    const {playlist} = this.props
    const {activeMusicIndex} = this.state
    const activeMusic = playlist[activeMusicIndex]

    if(this.refs.player){
      var player = this.refs.player;
      if(this.refs.player.currentSrc !== activeMusic.src){
      this.refs.player.src = activeMusic.src;
      }

      if(player.paused){
        if(this.state.is_playing){
          player.play();
        }
      }
      else if (this.state.is_playing){
        player.pause();
      }
    }

    var playerClsName = {
      "fas": true,
      "fa-play": !this.state.is_playing,
      "fa-pause": this.state.is_playing
    };

    return(
      <div className = "player">

        <div className = "inPlayer">
          <div className = "subject">
            <img className = "image" src ={activeMusic.cover} />
            <p> {activeMusic.title} </p>
            <p> / </p>
            <p> {activeMusic.artist}</p>
          </div>
          <div onClick={this.removeSong.bind(this)} className = "exiting"><i className="fa fa-times"></i></div>
          <div onClick={this.togglePlay.bind(this)} className = "playing">
            <i className={classnames(playerClsName)}></i>
          </div>
        </div>

        <audio ref = "player" autoPlay={this.state.is_playing} >
           <source src = {activeMusic.src}/>
        </audio>

      </div>
    );
  }
}

document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause();
        }
    }
}, true);

function classnames(obj){
  var css = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key]){
      css.push(key);
    }
  });
  return css.join(' ');
}

export default Player;
