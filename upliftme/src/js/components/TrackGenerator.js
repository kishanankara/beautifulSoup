import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import queryString from 'query-string';
import MusicPlayer from 'react-responsive-music-player';
import SpotifyIcon from './SpotifyIcon.js';
import Spinner from 'react-spinkit';



class TrackGenerator extends Component{
	constructor(prop){
		super();
		this.state={prop}
	}


	componentDidMount(){
		let accessToken = this.state.prop.secret;
		let mood = this.state.prop.mood;
		console.log('Access_token: ',accessToken);
		console.log('Mood: ',mood);


		//Query Spotify for correct mood playlists
		if(mood!=='Chill' && mood!=='Angry' && mood!=='Happy' && mood!=='Sad' )
		{
        	mood = 'Happy';
      	}
      	var uri = 'https://api.spotify.com/v1/search?q=' + mood + '&type=playlist&limit=25';
      	fetch(uri,{
        	headers: {'Authorization': 'Bearer ' + accessToken}
      	})
      	.then(response => response.json())
      	.then(data => this.setState( {data:data}, function(){this.afterMount(this.state.data);} ) );
	}

	afterMount(){

	}

	render(){
		return(
			<div>
				<Spinner name="ball-pulse-rise" color="purple"/>
			</div>

		);
	}



}

export default TrackGenerator;