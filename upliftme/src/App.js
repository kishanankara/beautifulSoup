import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import ReactPlayer from 'react-player';
import ReactVideoComponent from 'react-video-component';
import Vid from './assets/vid.mov';
import Vidwebm from './assets/vid.webm';
import Logo from './assets/logo.png';
import Spotify from './assets/spotify.png';
import Happy from './assets/happy.png';
import Angry from './assets/angry.png';
import Chill from './assets/chill.png';
import Sad from './assets/sad.png';
import Descimg from './assets/Running_2.jpg';
import './styles/style.css';
import './styles/first_media.css';
import './styles/second_media.css';
//import HoverImage from "react-hover-image";



class under_dev extends Component{
  render(){
    return (
      <div className='under_dev'>
          <p>Under Development</p>
      </div>
    );
  }
}


class Moods extends Component{
  constructor(props){
    super(props);
    this.state={
      data: {}
    }
  }
  componentExecute(){
    let parsd = queryString.parse(window.location.search);
    let accessToken = parsd.access_token;

    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me',{
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json()).then(data => this.setState({
      user:
      {
        name: data.display_name
      }
    }))
  }
  render(){
    return(
      <div class ="moods">
          <span class = 'first_half'>
          <img src={Happy}  class ="happy" width="85" height="85" onClick={() => queryString.parse(window.location.search).access_token? window.location = 'http://localhost:3000/callback': window.location='http://localhost:8888/login'} />
          <img src={Angry} class ="angry" width="85" height="85" onClick={() => queryString.parse(window.location.search).access_token? window.location = 'http://localhost:3000/callback': window.location='http://localhost:8888/login'}/>
          </span>
          <span class = 'second_half'>
          <img src={Sad} class ="sad" width="85" height="85" onClick={() => queryString.parse(window.location.search).access_token? window.location = 'http://localhost:3000/callback': window.location='http://localhost:8888/login'}/>
          <img src={Chill} class ="chill" width="85" height="85" onClick={() => queryString.parse(window.location.search).access_token? window.location = 'http://localhost:3000/callback': window.location='http://localhost:8888/login'}/>
          </span>
      </div>
    );
  }
}

class LogoIcon extends Component{
  render(){
    return(
      <div class ="logoIcon">
          <img src={Logo}  class ="logo" width="130" height="55" onClick={() => window.location='http://localhost:3000/'}/>
          </div>
    );
  }
}

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

class Header extends Component{
  render() {
    return (
      <header class="v-header container">
          <div class ="fullscreen-video-wrap">
              <video autoplay="true" play="true" loop="true" muted="true">
                <source src={Vid} type="video/mp4"/> //Safari
                <source src={Vidwebm} type="video/webm"/> //Firefox
              </video>
          </div>
          <div class="header-overlay"></div>
          <div class="header-content">

            <h1>moodMatch</h1>
            <p>Choose a mood and we will create a playlist that matches your mood. </p>
            <div class="spacer"></div>
            <Moods/>
          </div>
          </header>
    );
  }
}

// class Latest extends Component{
//   render(){
//     return (
//       <div class = "back-ground">
//         <div class = "song-container">
//         <h3>Latest song or Favorite song</h3>
//         </div>
//       </div>
//     );
//   }
// }
//
// class exampleForNow extends Component{
//   render(){
//     return(
//      <p>here</p>
//     );
//   }
// }


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
      /*Latest*/
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
