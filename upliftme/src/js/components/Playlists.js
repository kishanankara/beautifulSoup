import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import queryString from 'query-string';
import MusicPlayer from 'react-responsive-music-player';
import SpotifyIcon from './SpotifyIcon.js';
import Spinner from 'react-spinkit';
import img from '../../assets/back.jpg';
import {bake_cookie,read_cookie,delete_cookie} from 'sfcookies';
import Player from './Player.js';
import Backtohome from './Backtohome.js';
import Function from './Function.js';
//import img from '../../assets/back.jpg';
import '../../styles/playlist.css';
import testing from '../../assets/back.jpg';
import Moods from './Moods.js';

// const playlist=[];
var N = 10; // max size of playlist to be rendered on screen
const TARGET_PLAYLIST_SIZE = 50; // min size of Spotify playlist to consider

class Playlists extends Component{

  //{/* The second page of our Web App consists of a player which houses playable tracks and album art. Its name is Bill. */}
  constructor(){
    super();
    this.state= {name: 'Bill'}
  }


  // This initially mounts our playlist component.
    //1. Uses the query-string package to parse the URL containing the access token.
        //(Access token is generated after uses the "conenct to Spotify" button)
    //2. Ensures the query provided to access the playlist page is valid
    //3. Passes the query and access token to Spotify using Spotify API
    //4. Sets the data property of Playlist component to the results returned by Spotify
    //5. After state is set, calls afterMount to process the returned Spotify data
  componentDidMount(){
    //console.log("componentDidMount ran!");

    let val = read_cookie('data');
    // let val1 = val.split("=");
    let accessToken = val[1];
		let mood = this.props.mood;
    console.log(val);
    if (!accessToken){
      console.log("Uh oh, no access token found at mounting");
      return;
    }
      var query = this.props.query;
      console.log(query);
      if(query!=='Chill' && query!=='Angry' && query!=='Happy' && query!=='Sad' )
      {
        query = 'you suck';
      }
      var uri = 'https://api.spotify.com/v1/search?q=' + query + '&type=playlist&limit=25';
      fetch(uri,{
        headers: {'Authorization': 'Bearer ' + accessToken}
      })
      .then(response => response.json())
      .then(data => this.setState( {data:data}, function(){this.afterMount(this.state.data);} ) );

      fetch('https://api.spotify.com/v1/me',{
        headers: {'Authorization': 'Bearer ' + accessToken}
      })
      .then(response => response.json())
      .then(data=> this.setState({details: data}));
  }



  //Finds any tracks in data of Playlist component and processes them into a list of tracks to be rendered.
    //1. Checks for valid access token
    //2. Looks for a list of tracks in data and, if found, saves to 'tracks' state of Playlist component
    //3. After 'tracks' state is verified complete, call pruneTracksList on tracks to remove tracks which:
      //lack album art
      //lack an associated url that points to the Spotify song
  //*Note: afterMount must be called only after setState completes in componentDidMount.
  afterMount(trackList){
    /*Debug print statements*/
      //console.log("afterMount ran!");
      //console.log(trackList);
      //console.log(trackList.playlists);
      //console.log(trackList.playlists.items[0]);

      let val = read_cookie('data');
      // let val1 = val.split("=");
      let accessToken = val[1];
  		let mood = this.props.mood;
    if (!accessToken){
      console.log("No access token at tracks level");
      return;
    }

    // console.log('DOES trackList.playlists CHANGE OVER TIME?'); //No
    // console.log('TrackList.playlists at start of afterMount: ',trackList.playlists);

    //fetch a random playlist instead of the first one
    var chosenPlaylistIndex = this.findLargePlaylist(trackList);

    console.log('List of playlists to choose from: ', trackList.playlists); //List of playlists
    console.log('Random playlist index chosen: ', chosenPlaylistIndex);
    console.log('Playlist to be fetched: ',trackList.playlists.items[chosenPlaylistIndex]); //
    console.log('href to fetch: ',trackList.playlists.items[chosenPlaylistIndex].tracks.href);


    fetch(trackList.playlists.items[chosenPlaylistIndex].tracks.href,{
      headers: {'Authorization': 'Bearer ' + accessToken}
    })
      .then(response => response.json())
      .then(tracks_preprune => this.setState( {tracks:this.pruneTracksList(tracks_preprune)} ) );


    // fetch(trackList.playlists.items[0].tracks.href,{
    //   headers: {'Authorization': 'Bearer ' + accessToken}
    // })
    //   .then(response => response.json())
    //   .then(tracks => this.setState( {tracks:this.pruneTracksList(tracks)} ) );

    console.log("afterMount finished");
  }


  //Input: tracks as fetched from API call for mood-specific playlist
  //Output: list of tracks processed to only include those with both album art and a preview_url
  pruneTracksList(tracks){
    console.log('Tracks list before pruning: ',tracks);
    console.log('Num tracks before pruning: ', tracks.items.length);

    if(!tracks.items)
    {
      console.log("This list of tracks has no tracks!");
      return [];
    }

    var trackList = [];
    for(var i=0; i<tracks.items.length; i++){
      if(this.processTrack(tracks.items[i])){
        trackList.push(tracks.items[i]);
        console.log('Item ',i+1);
      }
    }

    // var n = 10;
    if(trackList.length < N){
      N = trackList.length;
    }

    console.log('Length of processed tracklist is currently: ',trackList.length);
    console.log('Tracklist before choosing 10: ',trackList);
    console.log(trackList.length);
    console.log('First song on tracklist: ', trackList[0]);
    console.log('Length of processed trackList will be: ',N);


    //choose n songs randomly before returning
    return this.chooseNSongs(N, trackList);
  }


  chooseNSongs(n, list){
    let listOfNSongs=[];
    var range = list.length;

    for(var i=0; i<n; i++){
      //Choose random index from current range
      var indexOfRandomTrack = this.generateRandomNumber(0,range-1);
      console.log('Index chosen: ', indexOfRandomTrack);
      //Decrement range
      range--;
      //Remove chosen song at this index and add to list of chosen songs
      console.log('**List before splice: ',list);
      let arrayWithRemovedValue = list.splice(indexOfRandomTrack,1);
      console.log('**List after splice: ', list);

      listOfNSongs.push(arrayWithRemovedValue[0]);
    }

    console.log('============');
    console.log('List of n songs: ',listOfNSongs);
    return listOfNSongs;
  }



  //Returns the INDEX of a random playlist of size >== TARGET_PLAYLIST_SIZE
  findLargePlaylist(list){
    //let arrayTracker = [];
    var largePlaylistCounter = 0;
    // var TARGET_PLAYLIST_SIZE = 50;
    var largestPlaylist = 0;

    //console.log('SCANNING PLAYLISTS');
    //Scan list of playlists and store all with >=50 songs
    for(var i=0; i<list.playlists.items.length; i++){

      //Track largest playlist found just in case none are greater than TARGET_PLAYLIST_SIZE
      if(list.playlists.items[i].tracks.total > largestPlaylist){
        largestPlaylist = list.playlists.items[i].tracks.total;
      }

      if(list.playlists.items[i].tracks.total >= TARGET_PLAYLIST_SIZE){
        largePlaylistCounter++;
        //arrayTracker.push(i);
      }
    }

    //If no playlists of size TARGET_PLAYLIST_SIZE, return index of largest playlist
    // if(arrayTracker.length === 0){
    //   return largestPlaylist;
    // }
    if(largePlaylistCounter === 0){
      return largestPlaylist;
    }
    else{
      //Return random index from array of large-enough songs
      //var randomIndex = this.generateRandomNumber(0,arrayTracker.length-1);
      var randomIndex = this.generateRandomNumber(0,largePlaylistCounter-1);
      console.log('Random playlist index chosen: ',randomIndex);
      console.log('Random playlist size: ',list.playlists.items[randomIndex].tracks.total);

      return randomIndex;
    }
  }

  //Chooses a random number within the min-max range provided, max inclusive
  generateRandomNumber(min,max_inclusive){
    return Math.floor(Math.random()*(max_inclusive-min+1)+min);
  }


  //Returns true if both album image and preview url exist (for a provided track). We will not provide users tracks without both.
  processTrack(trackItem){

       //let image = trackItem.track.album.images[0].url;
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
  //Note: This will be coded in a future iteration after functionality is developed to allow the user to delete tracks.
  componentDidUpdate(){

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

    //console.log("render ran!");
    //console.log(this.state.data);
    return(
      <div >

          {this.state.data ?
            <div className= "listing" >
              {/*console.log("We have data at render!")*/}
                {this.state.tracks && this.state.details?
                <div>
                  <div className = "wrapping"
                    style={{backgroundImage: `url(${this.state.tracks[0].track.album.images[0].url})`}}
                  >

                    <Backtohome/>
                    <div className = "right_box">
                      <p>Welcome</p>
                      <p> {this.state.details.display_name} </p>
                    </div>

                    <Function/>
                    <div className = "space"></div>
                    <Moods/>

                  </div>
                  <div className = "scrolling">
                    {/*console.log("We have tracks at render!")*/}
                    {/*console.log(this.state.tracks)*/}
                    <div>{this.state.tracks.map(m =>
                      <div key={m.track.id}>
                        { <div>

                          <Player playlist={[{src: m.track.preview_url,
                                cover: m.track.album.images[0].url,
                                title: m.track.name,
                                artist: [m.track.artists.map(n => n.name)]
                              }]}/>

                          </div>
                        }
                      </div>
                    )}

                  </div>
                  </div>
                </div>
              :<Spinner name="ball-pulse-rise" color="purple"/>}
          </div>
              : <Spinner name="ball-pulse-rise" color="purple"/>

            }
      </div>
    );
}
}

export default Playlists;
