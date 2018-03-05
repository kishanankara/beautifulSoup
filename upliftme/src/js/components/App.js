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
import Playlists from './Playlists.js';
import '../../styles/media.css'
//import HoverImage from "react-hover-image";


/*
WHAT DOES THIS DO?
*/
class ReloadItSelf extends Component{
  render(){
    return(
      <div id = 'log-to-left'>
        <LogoIcon/>
      </div>
    );
  }
}

//
/*
Creates a SpotifyIcon component which is placed in the top right corner of the page, displays the spotify.png image, and
says "Connect with Spotify". Functions as a button that when clicked, checks to see if user has an access token.
If access token, links to localhost:3000 (main page). If none, links to login page for Spotify on backend (localhost:8888/login)
*/
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


/*
WHAT DOES THIS DO?
*/
let user_data={
  name : 'Example'
};


/*
App is a component that represents the entire application.
The job of this component is to render all of the other components that make up the app (along with their built-in functionalities)
App is comprised of two sections: the constructor and the render() function.

Note: The cinstructor initializes the state of the component. Whenever the state changes the component re renders and the change is in 
effect immediately.state - React's way of defining what happens when a component changes its view, 
for example - a button when clicked might change its state from logged out to logged in.
*/
class App extends Component {
  
  //The first section of the App component - responsible for constructing the App component itself. Uses the constructor of Component to do so.
  constructor(props){
    super(props);
    this.state={ user : user_data} //WHAT DOES THIS DO?
  }

//this.setState({data : data})



  /* The second section of the App component - RESPONSIBLE FOR?
  Renders the first the a component (in this case App) renders.
  Calls an API and provides a specific track id that the application needs. (Where does this happen?)
  */
  render() {
    return (
      <div className="App"> //IS THIS THE NAME OF THE COMPONENT? HOW IS THIS DIFFERENT THAN THE NAME SPECIFIED IN THE LINE "class App extends..."?
      {window.location.href == 'http://localhost:3000/'?  //Checking it the current window location has a callback endpoint
      <div> //If callback endpoint is localhost:3000:
        <header class ="logo-header">
          <ReloadItSelf/>
          <SpotifyIcon/>
        </header>
        <Header/>
      </div>
      :     //Things before the colon is when the condition hold true else it is false and it goes to the else clause.
                //WHAT DOES THIS DO?
                 <div style={{'text-align': 'center','font-size': '50px', 'margin-top': '20px'}}>
                  <header class = "logo-header">
                  </header>
                  <Playlists/>
              </div>
            }
      </div>
    );
  }
}


export default App;
