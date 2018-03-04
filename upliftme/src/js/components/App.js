import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import ReactPlayer from 'react-player';
import ReactVideoComponent from 'react-video-component';
import Vid from '../../assets/vid.mov'; //Chrome and safari use this format.
import Vidwebm from '../../assets/vid.webm'; //Firefox supports videos that are in webm format.
import Logo from '../../assets/logo.png';
import Spotify from '../../assets/spotify.png';
import Happy from '../../assets/happy.png';    // In react components can have tags which are defined by other components this applies even for images and videos.
import Angry from '../../assets/angry.png';
import LogoIcon from './LogoIcon.js';
import Header from './Header.js';   //This line imports the Header component from the Header file.
import Chill from '../../assets/chill.png';
import Sad from '../../assets/sad.png';
import Descimg from '../../assets/Running_2.jpg';
import Moods from './Moods.js';     //This line importst the Moods file from the same directory location.
// import TrackPlayer from 'react-native-track-player';
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
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id = 'info-to-right'>
        <div class ="signin-btn" onClick={() => queryString.parse(window.location.search).access_token? window.location = window.location.href: window.location='http://localhost:8888/login'}>
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

// The App component renders first all other tags that are used in it are imported
// The cinstructor initializes the state of the component. Whenever the state changes
// the component re renders and the change is in effect immediately.
// state - React's way of defining what happens when a component changes its View
// for example - a button when clicked might change its state from logged out to logged in.

class App extends Component {
  constructor(props){
    super(props);
    this.state={
          user:{
                name: ''
                },
          playlist:{
                    song1: 'Hello,Adele',
                    song2: 'In the End, Linkin Park'
                  }

    }
  }
  //This function renders the first time a component renders.
  // In the current function it calls an API and provides a specific track id that it needs.

  componentDidMount(){
    let parsd = queryString.parse(window.location.search);
    let accessToken = parsd.access_token;

    if (!accessToken)
      return;
      fetch('https://api.spotify.com/v1/tracks/79tO3XgDSh9JdyVWJ4ZZBO',{
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response => response.json()).then(data => console.log(data))
  }

  render() {
    const user_name = this.state.user.name;
    const accessToken=this.state.accessToken;
    let result=null;

    return (
      <div className="App">
      {window.location.href != 'http://localhost:3000/callback'?  //Checking it the current window location has a callback endpoint
      <div>
        <header class ="logo-header">
          <ReloadItSelf/>
          <SpotifyIcon/>
        </header>
        <Header/>
      </div>
      :     //Things before the colon is when the condition hold true else it is false and it goes to the else clause.
                 <div style={{'text-align': 'center','font-size': '50px', 'margin-top': '20px'}}>
                  <header class = "logo-header">
                  </header>
                <p> {this.state.playlist.song1} </p>

                <p2> {this.state.playlist.song2} </p2>
                </div>
            }
      </div>
    );
  }
}


export default App;
