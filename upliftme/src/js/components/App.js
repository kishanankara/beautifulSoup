import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import ReactPlayer from 'react-player';
import ReactVideoComponent from 'react-video-component';
import Vid from '../../assets/vid.mp4'; //{/* Chrome and safari use this format. */}
import Vidwebm from '../../assets/vid.webm'; //{/* Firefox supports videos that are in webm format. */}
import Logo from '../../assets/logo.png';
import Spotify from '../../assets/spotify.png';
import Happy from '../../assets/happy.png';   // {/* In react components can have tags which are defined by other components this applies even for images and videos. */}
import Angry from '../../assets/angry.png';
import LogoIcon from './LogoIcon.js';
import Header from './Header.js';   //{/* This line imports the Header component from the Header file. */}
import Chill from '../../assets/chill.png';
import Sad from '../../assets/sad.png';
import Descimg from '../../assets/Running_2.jpg';
import Moods from './Moods.js';    // {/*This line importst the Moods file from the same directory location.*/}
// {/* import TrackPlayer from 'react-native-track-player'; */}
import '../../styles/style.css';
import Playlists from './Playlists.js';
import SpotifyIcon from './SpotifyIcon.js';
import goBack from './../../assets/goback.png';

import '../../styles/first_media.css';
import '../../styles/second_media.css';
// {/* import HoverImage from "react-hover-image"; */}




class ReloadItSelf extends Component{
  render(){
    return(
      <div id = 'log-to-left'>
        <LogoIcon/>
      </div>
    );
  }
}



// {/* The App component renders first all other tags that are used in it are imported
// The constructor initializes the state of the component. Whenever the state changes
//  the component re renders and the change is in effect immediately.
// state - React's way of defining what happens when a component changes its View
//  for example - a button when clicked might change its state from logged out to logged in.*/}
let user_data={
  name : 'Example'
};

class App extends Component {
  constructor(props){
    super(props);
    this.state={ user : user_data}
  }


  //*<!--/*mountNow: Checks for the query in the endpoint and only then renders the playlist part of it.
  componentDidMount(){
   var pathArray = window.location.pathname.split('/');
   for(var i=0;i<pathArray.length;i++){
     if(pathArray[i]==="secretKey" && i<pathArray.length-2){
       this.setState({mood: pathArray[i+1]});
       // this.setState({key: pathArray[i+2]});
       break;
     }
   }
  }

 mountNow()
 {
  var query = window.location.href.split('?')[0];
  query= query.substr(query.lastIndexOf('/')+1);
  return query;
 }

 //{/* This component takes care of the functionality for the Connect with Spotify button on the homepage. */}
 // {/*Checking it the current window location has a callback endpoint*/}
 //{/*Things before the colon is when the condition hold true else it is false and it goes to the else clause. */}
 render() {
   return (
     <div className="App">
     {
       (window.location.href=='http://localhost:3000/secretKey/Happy/auth' ||
         window.location.href=='http://localhost:3000/secretKey/Sad/auth' ||
         window.location.href=='http://localhost:3000/secretKey/Chill/auth' ||
         window.location.href=='http://localhost:3000/secretKey/Angry/auth') ?

         <div style={{'background-color':'#6600ff'}}>
           <div style={{'text-align': 'center','font-size': '50px'}}>
             <header class = "logo-header">
             </header>
             <Playlists  query={this.state.mood} />
           </div>
         </div>
         :
         (this.state.key) ?
             <div className="listing" style={{'background-color':'#6600ff'}}>
               <div style={{'text-align': 'center','font-size': '50px'}}>
                 <header class = "logo-header">
                 </header>
                 <Playlists secret = {this.state.key} query = {this.state.mood}/>
               </div>
             </div>
             :
             <div>
               <header class ="logo-header">
                 <ReloadItSelf/>
                 <SpotifyIcon data='Connect with Spotify' img={Spotify}/>
               </header>
               <Header/>
             </div>
     }
     </div>
   );
 }
}


export default App;
