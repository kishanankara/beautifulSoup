import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import queryString from 'query-string';
import MusicPlayer from 'react-responsive-music-player';
import SpotifyIcon from './SpotifyIcon.js';
import Spinner from 'react-spinkit';
import img from '../../assets/back.jpg';
import Player from './Player.js';
import Backtohome from './Backtohome.js';
import Function from './Function.js';
import '../../styles/playlist.css';
import testing from '../../assets/back.jpg';
import RefreshPlaylist from './RefreshPlaylist.js';


var N = 10; // max size of playlist to be rendered on screen
const TARGET_PLAYLIST_SIZE = 50; // min size of Spotify playlist to consider
let backend_uri = 'http://localhost:8888';
var trackID = 0;

class Playlists extends Component{

  //{/* The second page of our Web App consists of a player which houses playable tracks and album art. Its name is Bill. */}
  constructor(props){
    super(props);
    // console.log('Playlist this.props: ',props);
    this.state= {
      mood: this.props.mood,
      currentlyPlayingIndex: 0,
      currentlyPlayingID: 0
    }
    // console.log('HERES MAH MOOD',this.state.mood);
  }




  // This initially mounts our playlist component.
 //Should probably query backend for tracks and then set state after receiving response
  componentDidMount(){
    //console.log("componentDidMount ran!");

    console.log('Playlist this.state: ',this.state);
    if(this.state.mood==='happy'){
      console.log('Current mood is happy!');
      fetch('http://localhost:8888/generateHappy')
      .then(response => response.json())
      .then(tracks => this.setState( {tracks:tracks}, function(){console.log(this.state.tracks);}));
    }
    else if (this.state.mood==='sad'){
      console.log('Current mood is sad!');
      fetch('http://localhost:8888/generateSad')
      .then(response => response.json())
      .then(tracks => this.setState( {tracks:tracks}, function(){console.log(this.state.tracks);}));
    }
    else if (this.state.mood==='angry'){
      console.log('Current mood is angry!');
      fetch('http://localhost:8888/generateAngry')
      .then(response => response.json())
      .then(tracks => this.setState( {tracks:tracks}, function(){console.log(this.state.tracks);}));
    }
    else if (this.state.mood==='chill'){
      console.log('Current mood is chill!');
      fetch('http://localhost:8888/generateChill')
      .then(response => response.json())
      .then(tracks => this.setState( {tracks:tracks}, function(){console.log(this.state.tracks);}));
    }
    else{
      console.log('Error: unknown mood in Playlist component!');
    }

  }

  componentDidUpdate(){
    this.render();
  }

  //Renders our Playlist component. Runs any time the state of the component changes.
    //1. Sets visual properties of component
    //2. Checks that data and tracks exists within the Playlist component. If not, renders a loading message.
    //3. For each track in the playlist, render a MusicPlayer object with corresponding album art, track name, and artist
  render(){
    // const mystyle ={
    //   backgroundColor: '#6600ff',
    //   fontSize: 13,
    //   height: 250,
    //   width: 1500,
    //   fontColor: 'white',
    //   flex:1,
    //   borderStyle : 'solid',
    //   borderColor: 'black'
    // }
    // const elementsize ={
    //   backgroundColor: '#6600ff',
    //   height: 250,
    //   width: 1400,
    //   fontColor: 'white',
    //   alignItems: 'center',
    //   justifyContent : 'flex-start'
    //
    // }
    // const componentsize ={
    //   backgroundColor: 'white',
    //   height: 5000,
    //   width: 1400,
    //   flex:1,
    //   fontColor: 'white',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent : 'flex-start'
    //
    // }
    return(
      <div >

        {
          this.state.tracks ?
            <div>
              <div className = "wrapping" style={{backgroundImage: `url(${this.state.tracks.data[this.state.currentlyPlayingIndex].cover})`}} >
                <RefreshPlaylist/>                
                <Backtohome/>
              </div>

              <div className = "scrolling">
                  <div>
                  {
                    this.state.tracks.data.map(m =>
                      <div key={m._id}>
                      {
                        <div onClick={() => this.componentDidUpdate()}>
                          <Player playlist={[{
                            id: m._id,
                            src: m.preview_url,
                            cover: m.cover,
                            title: m.title,
                            artist: m.artist,
                            mood: this.state.mood,
                            }]}/>
                        </div>
                      }
                      </div>
                    )
                  }
                  </div>



              </div>


            </div>

          : <Spinner name="ball-pulse-rise" color="purple"/>
        }
      
      </div>

    );
  }
}

export default Playlists;
