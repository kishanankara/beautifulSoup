import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Happy from './assets/happy.png';
import Angry from './assets/angry.png';
import Sad from './assets/sad.png';
import Vid from './assets/vid.mov';
import Chill from './assets/chill.png';
import ReactPlayer from 'react-player';
import './styles/style.css'

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
  render(){
    return(
      <div class ="moods">
          <img src={Happy} class ="happy" width="100" height="100" hspace="70"/>
          <img src={Angry} class ="angry" width="100" height="100" hspace="70"/>
          <img src={Sad} class ="sad" width="100" height="100" hspace="70"/>
          <img src={Chill} class ="chill" width="100" height="100" hspace="70"/>
      </div>
    );
  }
}

class Header extends Component{
  render() {
    return (
      <header class="v-header container">
          <div class ="fullscreen-video-wrap">
            <video src={Vid} class="video_player" autoplay="true" loop="true"/>
          </div>
          <div class="header-overlay"></div>
          <div class="header-content">
            <h1>upLiftMe</h1>
            <p>How are you feeling today? </p>
            <div class="spacer"></div>
            <Moods/>
          </div>
          </header>
    );
  }
}

class Description extends Component{
  render(){
    return (
      <div>
      <p>Choose a mood and we will filter out a playlist for you! </p>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
      <under_dev/>
      <Header/>

      </div>
    );
  }
}

export default App;
