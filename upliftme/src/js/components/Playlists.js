import React, { Component} from 'react';
import Spinner from 'react-spinkit';
import Player from './Player.js';
import Backtohome from './Backtohome.js';
import '../../styles/playlist.css';
import RefreshPlaylist from './RefreshPlaylist.js';
import App, {frontendUri,backendUri} from './App.js';



function getTrackIndex(trackID,tracks){
  for(var i=0; i<tracks.length; i++){
    if(tracks[i]._id===trackID){
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
      currentlyPlayingID: -1,
    }
    this.updateParent = this.updateParent.bind(this);

  }

  // This initially mounts our playlist component.
  componentDidMount(){
    console.log('Playlist this.state: ',this.state);
    if(this.state.mood==='happy'){
      console.log('Current mood is happy!');
      fetch(backendUri+'/generateHappy')
      .then(response => response.json())
      .then(tracks => this.setState( {tracks:tracks}, function(){console.log(this.state.tracks);}));
    }
    else if (this.state.mood==='sad'){
      console.log('Current mood is sad!');
      fetch(backendUri+'/generateSad')
      .then(response => response.json())
      .then(tracks => this.setState( {tracks:tracks}, function(){console.log(this.state.tracks);}));
    }
    else if (this.state.mood==='angry'){
      console.log('Current mood is angry!');
      fetch(backendUri+'/generateAngry')
      .then(response => response.json())
      .then(tracks => this.setState( {tracks:tracks}, function(){console.log(this.state.tracks);}));
    }
    else if (this.state.mood==='chill'){
      console.log('Current mood is chill!');
      fetch(backendUri+'/generateChill')
      .then(response => response.json())
      .then(tracks => this.setState( {tracks:tracks}, function(){console.log(this.state.tracks);}));
    }
    else{
      console.log('Error: unknown mood in Playlist component!');
    }

  }

  updateParent(trackID_fromChild){  
      var trackIndex = getTrackIndex(trackID_fromChild,this.state.tracks.data);
      this.setState({currentlyPlayingIndex:trackIndex});
  }

  insertTrackId(trackID){
    return trackID;
  }

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
                          <Player   playlist={[{
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
