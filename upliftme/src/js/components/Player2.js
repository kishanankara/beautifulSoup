import React, {Component} from 'react';
import PropTypes from 'prop-types'
import '../../styles/Player.css';

class Player2 extends Component {

  constructor(props){
    super(props);

    console.log('MY PROPS: ',props);
    console.log('MyProps.playlist',props.playlist);

    this.state = {
      activeMusicIndex: 0,
      is_playing: false,
      album : props.playlist[0].cover,
      artists :props.playlist[0].artist,
      src :props.playlist[0].src,
      title :props.playlist[0].title,
      id : props.playlist[0].id
    };
  }

  togglePlay(){
    console.log('Hello, togglePlay!');
    if(this.state.is_playing){
      this.setState({is_playing:false});
    }
    else{
      this.setState({is_playing:true});
    }

  }

  getIcon(){
    if(this.state.is_playing){
      return "fas fa-pause";
    }
    else{
      return "fas fa-play";
    }
  }

  render() {

    

    return(
      <div className = "player">

        <div className = "inPlayer">
          <img className = "image" src ={this.state.album} />
          <div className = "subject">
            <p> {this.state.title} </p>
            <p> / </p>
            <p> {this.state.artists}</p>
          </div>
          <div className = "playing" onClick={()=>this.togglePlay()} >
          {
            this.state.is_playing ?
                <i class ="fas fa-pause"></i>
            :
                <i class ="fas fa-play"></i>             
          
          }
          </div>
        </div>

        <audio ref = "player" autoPlay={this.state.is_playing} >
           <source src = {this.state.src}/>
        </audio>

      </div>
    );
  }
}

document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    console.log('Audios: ',audios);
    console.log('eTarget: ',e.target);
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause();
            console.log('pause()!');
            //Have all player components that are not the currently playing track (e.target?) switch to play display
            console.log("eventlistener");
        }
    }
}, true);



export default Player2;
