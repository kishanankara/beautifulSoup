import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import queryString from 'query-string';
import MusicPlayer from 'react-responsive-music-player';
import SpotifyIcon from './SpotifyIcon.js';
import goBack from './../../assets/goback.png'


const playlist=[];

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
      var query = this.props.query;
      console.log(query);
      var uri = 'https://api.spotify.com/v1/search?q=' + query + '&type=playlist';
      fetch(uri,{
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

  populatePlaylist(){
     const tracks=this.state.tracks;
     if(tracks)
     {
       console.log('We have data@ populate Playlist');
       for(var i=0;i<tracks.length;i++)
       {
         if(tracks[i].track.preview_url && tracks[i].track.album.images[0].url && tracks[i].track.name)
         {
            const artists = tracks[i].track.artists;
            const artist_arr = [];
            for(var j=0;j<artists.length;j++)
            {
              artist_arr.push(artists[i]);
            }
            const JSON = {url: tracks[i].track.preview_url,
                  cover: tracks[i].track.album.images[0].url,
                  title: tracks[i].track.name,
                  artist: artist_arr
                 }
            playlist.push(JSON);

         }

       }
     }


  }

  //Should only check to make sure there are 10 songs in the playlist. If no, pull more in.
  componentDidUpdate(){

  }

  //Updated to remove accidental infinite loop on call to afterMount(). Added key-value pairs to map for effective render upon track removal
  render(){
    const mystyle ={
      backgroundColor: '#6600ff',
      fontSize: 10,
      height: 250,
      width: 1500,
      fontColor: 'white',
      borderStyle : 'solid',
      borderColoe: 'black'
    }
    const elementsize ={
      backgroundColor: '#6600ff',
      height: 250,
      width: 1400,
      fontColor: 'white',
      alignItems: 'center',
      justifyContent : 'flex-start'

    }
    const componentsize ={
      backgroundColor: 'white',
      height: 250,
      width: 1400,
      flex:1,
      fontColor: 'white',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent : 'flex-start'

    }
                         //https://open.spotify.com/track/4sPmO7WMQUAf45kwMOtONw?si=aQkPn1JdSYq708hvAg9-bQ
    console.log("render ran!");
    console.log(this.state.data);
    return(
      <div >
         <SpotifyIcon data='Go Back' img ={goBack}/>
          {this.state.data ?
            <div>
              {console.log("We have data at render!")}
                {this.state.tracks?
                  <div>
                    {console.log("We have tracks at render!")}
                    {console.log(this.state.tracks)}
                      <div>{this.state.tracks.map(m =>
                        <div key={m.track.id}>
                          { <div>
                            <div style = {elementsize}>
                            <MusicPlayer playlist={[{url: m.track.preview_url,
                                  cover: m.track.album.images[0].url,
                                  title: m.track.name,
                                  artist: [m.track.artists.map(n => n.name)]
                                }]} progressColor = 'black' btnColor= 'red' style={mystyle}/>
                            </div>
                            </div>
                          }
                        </div>
                      )}

                    </div>
                  </div>
              :<p>Data is loading ... </p>}
          </div>
              :<p>Data is loading...</p>

            }
      </div>
    );
}
}

export default Playlists;
