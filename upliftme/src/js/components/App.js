import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import ReactPlayer from 'react-player';
import ReactVideoComponent from 'react-video-component';
import Vid from '../../assets/vid.mov';
import Vidwebm from '../../assets/vid.webm';
import Logo from '../../assets/logo.png';
import Spotify from '../../assets/spotify.png';
import Happy from '../../assets/happy.png';
import Angry from '../../assets/angry.png';
import LogoIcon from './LogoIcon.js';
import Header from './Header.js';
import Chill from '../../assets/chill.png';
import Sad from '../../assets/sad.png';
import Descimg from '../../assets/Running_2.jpg';
import Moods from './Moods.js';
import '../../styles/style.css';
import '../../styles/media.css'
//import HoverImage from "react-hover-image";




class ReloadItSelf extends Component{
  render(){
    return(
      <div id = 'log-to-left'>
        <LogoIcon/>
      </div>
    );
  }
}

class SpotifyIcon extends Component{
  render(){
    return(
      <div id = 'spotify-to-right'>
        <div class ="signin-btn" onClick={() => queryString.parse(window.location.search).access_token? window.location = 'http://localhost:3000/callback': window.location='http://localhost:8888/login'}>
          <div class = "icon-spotify">
            <img src={Spotify} class = "logo" width="35" height="35"/>
          </div>
          <div id = 'descript'>
          Connect with Spotify
          </div>
        </div>
      </div>
    );
  }
}



class App extends Component {
  constructor(props){
    super(props);
    this.state={
          user_name:'Mr/Mrs. X',
          playlist:{
                    song1: 'Hello,Adele',
                    song2: 'In the End, Linkin Park'
                  }

    }
  }
  render() {
    return (
      <div className="App">
      {window.location.href != 'http://localhost:3000/callback'?
      <div>
      <header class = "logo-header">
        <ReloadItSelf/>
        <SpotifyIcon/>
      </header>
      <Header/>
      </div>:
                  <div style={{'text-align': 'center','font-size': '50px', 'margin-top': '20px'}}>
                  <header class = "logo-header">
                    <ReloadItSelf/>
                    <SpotifyIcon/>
                  </header>
                <h1>{this.state.user_name}'s Playlist</h1>
                <p> {this.state.playlist.song1} </p>
                <p2> {this.state.playlist.song2} </p2>
                </div>
            }
      </div>
    );
  }
}


export default App;
