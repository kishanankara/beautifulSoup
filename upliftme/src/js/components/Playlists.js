import React, { Component} from 'react';
// import ReactDOM from 'react-dom';
// import ReactPlayer from 'react-player';
// import queryString from 'query-string';
// import MusicPlayer from 'react-responsive-music-player';
// import SpotifyIcon from './SpotifyIcon.js';
import Spinner from 'react-spinkit';
// import img from '../../assets/back.jpg';
import Player from './Player.js';
import Backtohome from './Backtohome.js';
// import Function from './Function.js';
import '../../styles/playlist.css';
// import testing from '../../assets/back.jpg';
import RefreshPlaylist from './RefreshPlaylist.js';


let backend_uri = 'http://localhost:8888';


function getTrackIndex(trackID,tracks){
  for(var i=0; i<tracks.length; i++){
    if(tracks[i]._id===trackID){
      // console.log('Track is located at index: ',i);
      return i;
    }
  }
  return -1;
}


class Playlists extends Component{

  //{/* The second page of our Web App consists of a player which houses playable tracks and album art. Its name is Bill. */}
  constructor(props){
    super(props);
    this.state= {
      mood: this.props.mood,
      currentlyPlayingIndex: 0,
      currentlyPlayingID: -1
    }
    this.updateParent = this.updateParent.bind(this);

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

  //Consider implementing 'pass all of child state up, make deep copy of playlist state, do setState' as written in email
  updateParent(trackID_fromChild, child_State){  //Right now just implement so album art is updated
      // console.log('TrackID Im looking for: ',trackID_fromChild);
      // console.log('My parent state: ',this.state);
      
      //Find index of trackID passed from child player
      var trackIndex = getTrackIndex(trackID_fromChild,this.state.tracks.data);
      // console.log('Index of selected track: ',trackIndex);
      
      //Set this.state.currentlyPlayingIndex to this index value
      // this.setState({currentlyPlayingIndex:trackIndex},function(){console.log('Index has been updated')});
      this.state.currentlyPlayingIndex = trackIndex;  //Return here. Can I set global variables above this class that updateParent can use to communicate with other parts of this component?
      // this.forceUpdate();
      console.log('this.ref is: ',this.ref);
      console.log('this.foo is: ',this.foo);
      this.foo.siblingMeth();
  }

  insertTrackId(trackID){
    return trackID;
  }


  //Can do turnary check on if (m._id === currentlyPlayingId) and if yes, render playing button, else render non-playing button
  render(){

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
                        <div>
                          <Player
                          ref = {foo => {
                            this.foo = foo;
                          }}

                          playlist={[{
                            id: m._id,
                            src: m.preview_url,
                            cover: m.cover,
                            title: m.title,
                            artist: m.artist,
                            mood: this.state.mood,
                            is_playing: m.is_playing,
                            updateParent: this.updateParent,
                            }]}
                          />
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
