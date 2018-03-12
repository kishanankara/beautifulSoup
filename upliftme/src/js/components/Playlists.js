import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import queryString from 'query-string';

class Playlists extends Component{

  constructor(){
    super();
    this.state= {name: 'Bill'}
  }
  componentDidMount(){
    console.log("componentDidMount ran!");
    let parsd = queryString.parse(window.location.search);
    let accessToken = parsd.access_token;

    if (!accessToken){
      console.log("Uh oh, no access token found at mounting");
      return;
    }

      fetch('https://api.spotify.com/v1/search?q=Sad&type=playlist',{
        headers: {'Authorization': 'Bearer ' + accessToken}
      })
      .then(response => response.json())
      .then(data => this.setState( {data:data}, function(){this.afterMount(this.state.data);} ) );

  }



  //Called only after setState completes in componentDidMount. Looks for a list of tracks in data and, if found, saves to state
  afterMount(trackList){
    console.log("afterMount ran!");
    console.log(trackList);
    console.log(trackList.playlists);
    console.log(trackList.playlists.items[0]);
    let parsd = queryString.parse(window.location.search);
    let accessToken = parsd.access_token;
    if (!accessToken){
      console.log("No access token at tracks level");
      return;
    }

    fetch(trackList.playlists.items[0].tracks.href,{
      headers: {'Authorization': 'Bearer ' + accessToken}
    })
      .then(response => response.json())
      .then(tracks => this.setState( {tracks:this.pruneTracksList(tracks)} ) );
    console.log("afterMount finished");
  }

  //Input: tracks as fetched from API call for mood-specific playlist
  //Output: list of tracks processed to only include those with both album art and a preview_url
  pruneTracksList(tracks){
    if(!tracks.items)
    {
      console.log("This list of tracks has no tracks!");
      return [];
    }

    var trackList = [];
    for(var i=0; i<tracks.items.length; i++){
      if(this.processTrack(tracks.items[i])){
        trackList.push(tracks.items[i]);
      }
    }
    return trackList;

  }

  //Returns true if both album image and preview url exist (for a provided track)
  processTrack(trackItem){
       let image = trackItem.track.album.images[0].url; //Does this return error if none exist?
       let prev_url = trackItem.track.preview_url;


       if(!prev_url){
          console.log("No preview url!");
          return false;
       }

       if(!trackItem.track.album){
          console.log("No album!");
          return false;
       }

       if(!trackItem.track.album.images[0]){
          console.log("No album images!");
          return false;
       }
       if(!trackItem.track.album.images[0].url){
          console.log("No url for album image!");
          return false;
       }
       return true;

  }



  //Should only check to make sure there are 10 songs in the playlist. If no, pull more in.
  componentDidUpdate(){

  }

  //Updated to remove accidental infinite loop on call to afterMount(). Added key-value pairs to map for effective render upon track removal
  render(){                                           //https://open.spotify.com/track/4sPmO7WMQUAf45kwMOtONw?si=aQkPn1JdSYq708hvAg9-bQ
    console.log("render ran!");
    console.log(this.state.data);
    return(
      <div>
          {this.state.data ?
            <div>
              {console.log("We have data at render!")}
                {this.state.tracks?
                  <div>
                    {console.log("We have tracks at render!")}
                    {console.log(this.state.tracks)}
                    <p>The data is here :<br/></p>
                      <div>{this.state.tracks.map(m =>
                        <div key={m.track.id}>
                          {
                            <div> <img src={m.track.album.images[0].url} height="400px" padding="10px"/>
                                  <br/>
                                  <audio controls>
                                  <source src={m.track.preview_url} type="audio/mp3"/></audio>
                            </div>
                          }
                        </div>
                      )}
                      </div>
                  </div>
              :<p>Sorry, no tracks found at render</p>}
          </div>
              :<p>Sorry, no data found at render </p>

            }
      </div>
    );
}
}

export default Playlists;
