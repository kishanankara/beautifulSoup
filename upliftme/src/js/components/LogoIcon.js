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
import Chill from '../../assets/chill.png';
import Sad from '../../assets/sad.png';
import Descimg from '../../assets/Running_2.jpg';
import Moods from './Moods.js';


{/*Component for the Jazz Logo*/}

class LogoIcon extends Component{
  render(){
    return(
      <div class ="logoIcon">
          <img src={Logo}  class ="logo" width="130" height="55" onClick={() => window.location='http://localhost:3000/'}/>
          </div>
    );
  }
}

export default LogoIcon;
