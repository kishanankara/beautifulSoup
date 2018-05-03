import React, { Component } from 'react';
import Vid from '../../assets/vid.mp4';
import Vidwebm from '../../assets/vid.webm';
import Moods from './Moods.js';


//** The Main Page basically, contains the background video, the four moods
//and the description.*
class Header extends Component{
  render() {
    return (
      <header className="v-header container">
          <div className ="fullscreen-video-wrap">
              <video autoPlay="true" play="true" loop="true" muted="true">
                <source src={Vid} type="video/mp4"/> /{/*Safari*/}
                <source src={Vidwebm} type="video/webm"/> {/*Firefox*/}
              </video>
          </div>
          <div className="header-overlay"></div>
          <div className="header-content">

            <h1>moodMatch</h1>

            <p>Choose a mood and we will create a playlist that matches your mood. </p>
            <div className="spacer"></div>
            <Moods/>
          </div>
          </header>
    );
  }
}

export default Header;
