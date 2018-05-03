import React, {Component} from 'react';
import PropTypes from 'prop-types'
import '../../styles/Player.css';
import App, {frontendUri,backendUri} from './App.js';

var http = require('http')


class Player extends Component {

  static propTypes = {
    playlist : PropTypes.array.isRequired
  }

  static defaultProps = {
    playlist: []
  }


  constructor(props){
    super(props);

    this.state = {
      trackID: props.playlist[0].id,
      isLiked : false,
      isDisliked: false,
      probPoints : props.probPoints,
      mood: props.playlist[0].mood,
      is_playing: props.playlist[0].is_playing,
      title: props.playlist[0].title,
      artist: props.playlist[0].artist,
      src: props.playlist[0].src,
    };

    this.updateParent_Child = this.updateParent_Child.bind(this);
  }

  updateParent_Child(trackID){
    this.props.playlist[0].updateParent(trackID);
  }


  onPlay(){
    // console.log('*onPlay was called*');
    this.setState({is_playing:true},function(){this.updateParent_Child(this.state.trackID)});
  }
  onPause(){
    // console.log('*onPause was called*');
    this.setState({is_playing:false});
  }
  togglePlayStatus(){
    // console.log('TOGGLEPLAYSTATUS ENTERED');
    if(!this.state.is_playing){
      this.refs.player.play();
    }
    else{
      this.refs.player.pause();
    }
  }
  toggleDisliked(){
    if(!this.state.isDisliked){
      this.setState({isDisliked:true},function(){console.log('isDisliked was false. Updated to: ',this.state.isDisliked)});
    }
    else{
      this.setState({isDisliked:false},function(){console.log('isDisliked was true. Updated to: ',this.state.isDisliked)});
    }
  }
  toggleLiked(){
    if(!this.state.isLiked){
      this.setState({isLiked:true},function(){console.log('isLiked was false. Updated to: ',this.state.isLiked)});
    }
    else{
      this.setState({isLiked:false},function(){console.log('isLiked was true. Updated to: ',this.state.isLiked)});
    }
  }

  toggleLikedAndDisliked(){
    this.setState({isLiked:!this.state.isLiked, isDisliked:!this.state.isDisliked},function(){console.log('isLiked is now: ',this.state.isLiked,' and isDisliked is now: ',this.state.isDisliked)});
  }


  render() {

    var play_img = "fas fa-play"; //default is 'play' view state
    var backgroundColors = {
        "Default": "#404040",
        "Green": "#00FF00",
        "Orange": "#FF9933",
    };

    var likeButtonStyles = {
      "Default":"playing",
      "Like":"playing_liked",
      "Dislike":"playing_disLiked",
    }
    var isNeitherLikedNorDisliked = !this.state.isLiked && !this.state.isDisliked;
    var isBothLikedAndDisliked = this.state.isLiked && this.state.isDisliked;
    if(isBothLikedAndDisliked){
      console.log('OH NO! HOW DID THIS TRACK BECOME BOTH LIKED AND DISLIKED?');
    }

    var likeStyle = this.state.isLiked ? likeButtonStyles.Like : likeButtonStyles.Default;
    var dislikeStyle = this.state.isDisliked ? likeButtonStyles.Dislike : likeButtonStyles.Default
    // var likeColors = {
    //   "Default": "#404040",
    //   "Green": "#00FF00",
    // };
    // var dislikeColors = {
    //   "Default": "#404040",
    //   "Orange": "#FF9933",
    // };

    if(this.refs.player){

      //If this track is supposed to be playing
      if(this.state.is_playing){
        //set background to pause view
        play_img = "fas fa-pause";
      }
      else{ //Track should not be playing
        play_img = "fas fa-play";
      }
    }
 
    return(
      <div className = "player">
        <div className = "inPlayer">
          
          <img className = "image" src ={this.state.cover} />
          <div className = "subject">
            <p> {this.state.title} </p>
            <p> / </p>
            <p> {this.state.artist}</p>
          </div>
          
          <div className = "buttonWrapper" >


            <div className = {dislikeStyle} onClick={()=>
              {
                if(isNeitherLikedNorDisliked){ //Case: Both L and DL are unengaged. Issue dislike, toggle dislike
                  var mood = this.state.mood;
                  console.log('Button mood: ',mood);
                  var id = this.state.trackID;
                  console.log('Button id: ',id);
                  var options = 
                  {
                    path: backendUri+'/dislike/'+mood+'Tracks/'+id+'/1',
                    method: 'PUT'
                  };
                  var req = http.request(options, function(res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                      console.log('BODY: ' + chunk);
                    });
                  });

                  req.on('error', function(e) {
                    console.log('problem with request: ' + e.message);
                  });

                  req.write('data\n');
                  req.write('data\n');
                  req.end();
                  this.toggleDisliked();
                }
                else if(this.state.isDisliked){ //Case: DL is presently engaged. Undo dislike by issuing like,toggle dislike
                  var mood = this.state.mood;
                  console.log('Button mood: ',mood);
                  var id = this.state.trackID;
                  console.log('Button id: ',id);
                  var options = 
                  {
                    path: backendUri+'/like/'+mood+'Tracks/'+id+'/1',
                    method: 'PUT'
                  };
                  var req = http.request(options, function(res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                      console.log('BODY: ' + chunk);
                    });
                  });

                  req.on('error', function(e) {
                    console.log('problem with request: ' + e.message);
                  });

                  req.write('data\n');
                  req.write('data\n');
                  req.end();
                  this.toggleDisliked();
                }
                else{ //Case: L engaged and DL unengaged. Issue double dislike, toggle both like and dislike
                  var mood = this.state.mood;
                  console.log('Button mood: ',mood);
                  var id = this.state.trackID;
                  console.log('Button id: ',id);
                  var options = 
                  {
                    path: backendUri+'/dislike/'+mood+'Tracks/'+id+'/2',
                    method: 'PUT'
                  };
                  var req = http.request(options, function(res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                      console.log('BODY: ' + chunk);
                    });
                  });

                  req.on('error', function(e) {
                    console.log('problem with request: ' + e.message);
                  });

                  req.write('data\n');
                  req.write('data\n');
                  req.end();
                  this.toggleLikedAndDisliked();
                }
                
              }}>
              <i className ="fa fa-thumbs-down"></i>
            </div>



            <div className ={likeStyle} onClick={()=>
              {
                if(isNeitherLikedNorDisliked){ //Case: Both L and DL are unengaged. Issue like, toggle like
                  var mood = this.state.mood;
                  console.log('Button mood: ',mood);
                  var id = this.state.trackID;
                  console.log('Button id: ',id);
                  var options = 
                  {
                    path: backendUri+'/like/'+mood+'Tracks/'+id+'/1',
                    method: 'PUT'
                  };
                  var req = http.request(options, function(res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                      console.log('BODY: ' + chunk);
                    });
                  });

                  req.on('error', function(e) {
                    console.log('problem with request: ' + e.message);
                  });

                  req.write('data\n');
                  req.write('data\n');
                  req.end();
                  this.toggleLiked();
                } 
                else if(this.state.isLiked){ //Case: L is presently engaged. Undo like by issuing dislike, toggle like
                  var mood = this.state.mood;
                  console.log('Button mood: ',mood);
                  var id = this.state.trackID;
                  console.log('Button id: ',id);
                  var options = 
                  {
                    path: backendUri+'/dislike/'+mood+'Tracks/'+id+'/1',
                    method: 'PUT'
                  };
                  var req = http.request(options, function(res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                      console.log('BODY: ' + chunk);
                    });
                  });

                  req.on('error', function(e) {
                    console.log('problem with request: ' + e.message);
                  });

                  req.write('data\n');
                  req.write('data\n');
                  req.end();
                  this.toggleLiked();
                }
                else{ //Case: DL engaged and L unengaged. Issue double like, toggle both
                  var mood = this.state.mood;
                  console.log('Button mood: ',mood);
                  var id = this.state.trackID;
                  console.log('Button id: ',id);
                  var options = 
                  {
                    path: backendUri+'/like/'+mood+'Tracks/'+id+'/2',
                    method: 'PUT'
                  };
                  var req = http.request(options, function(res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                      console.log('BODY: ' + chunk);
                    });
                  });

                  req.on('error', function(e) {
                    console.log('problem with request: ' + e.message);
                  });

                  req.write('data\n');
                  req.write('data\n');
                  req.end();
                  this.toggleLikedAndDisliked();
                }
                  
              }}>                
              <i className ="fa fa-thumbs-up"></i>
            </div>

            <div className = "playing" onClick={this.togglePlayStatus.bind(this)} >
              <i className ={play_img}></i>
              <audio ref = "player" autoPlay={this.state.is_playing} onPlay={this.onPlay.bind(this)} onPause={this.onPause.bind(this)} >
                <source src = {this.state.src}/>
              </audio>
            </div>


          </div>
        </div>
      </div>
    );
  }
}


document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');

    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] !== e.target){
            audios[i].pause();
        }
    }
}, true);


export default Player;
