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


class Moods extends Component{
  constructor(props){
    super(props);
    this.state={
      data: {}
    }
  }
  render(){
    return(
      <div class ="moods">
          <img src={Happy}  class ="happy" width="90" height="90" hspace="75" onClick={()=>window.location='http://localhost:8888/login'} />
          <img src={Angry} class ="angry" width="90" height="90" hspace="75"  onClick={() => queryString.parse(window.location.search).access_token? window.location = 'http://localhost:3000/callback': window.location='http://localhost:8888/login'}/>
          <img src={Sad} class ="sad" width="90" height="90" hspace="75" onClick={() => queryString.parse(window.location.search).access_token? window.location = 'http://localhost:3000/callback': window.location='http://localhost:8888/login'}/>
          <img src={Chill} class ="chill" width="90" height="90" hspace="75" onClick={() => queryString.parse(window.location.search).access_token? window.location = 'http://localhost:3000/callback': window.location='http://localhost:8888/login'}/>
      </div>
    );
  }
}

export default Moods;
