import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import Vid from '../../assets/vid.mov';
import Vidwebm from '../../assets/vid.webm';
import Moods from './Moods.js';
import SearchBar from './SearchBar.js';




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
            <SearchBar/>
            
            <p>Choose a mood and we will create a playlist that matches your mood. </p>
            <div class="spacer"></div>
            <Moods/>
          </div>
          </header>
    );
  }
}

export default Header;
