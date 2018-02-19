import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Happy from './assets/happy.png';
import Angry from './assets/angry.png';
import HoverImage from "react-hover-image";
import Sad from './assets/sad.png';
import Vid from './assets/vid.mov';
import Vidwebm from './assets/vid.webm';
import ReactVideoComponent from 'react-video-component';
import Chill from './assets/chill.png';
import ReactPlayer from 'react-player';
import './styles/style.css'
import Descimg from './assets/Running_2.jpg';

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
          <img src={Happy}  class ="happy" width="100" height="100" hspace="70" onClick={() => window.location = 'http://localhost:8888/callback'} />
          <img src={Angry} class ="angry" width="100" height="100" hspace="70"  onClick={() => window.location = 'http://localhost:8888/callback'}/>
          <img src={Sad} class ="sad" width="100" height="100" hspace="70" onClick={() => window.location = 'http://localhost:8888/callback'}/>
          <img src={Chill} class ="chill" width="100" height="100" hspace="70" onClick={() => window.location = 'http://localhost:8888/callback'}/>
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
      <header class="desc-header container">
          <div class ="fullscreen-picture-wrap">
              <img src={Descimg}/>
          </div>
          <div class="headerimg-overlay"></div>
          <div class="header-desc-content">
            <p>Choose a mood and we will create a playlist that matches your mood. </p>
          </div>
          </header>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
      <Header/>
      <Description/>
      </div>
    );
  }
}


export default App;
