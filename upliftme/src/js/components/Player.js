import React, {Component} from 'react';
import PropTypes from 'prop-types'
import '../../styles/Player.css';

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

    //Return here: Left off play_display for now
    this.state = {
      activeMusicIndex: 0,
      trackID: props.playlist[0].id,
      isLiked : false,
      isDisliked: false,
      probPoints : props.probPoints,
      mood: props.playlist[0].mood,
      is_playing: props.playlist[0].is_playing,
      title: props.playlist[0].title,
      artist: props.playlist[0].artist,

    };

    this.updateParent_Child = this.updateParent_Child.bind(this);

  }

  updateParent_Child(trackID,playerState){
    this.props.playlist[0].updateParent(trackID,playerState);
  }

  togglePlay(){
    console.log('Entered togglePlay');
    if(this.state.is_playing===false){
      this.setState({is_playing:true},function(){this.updateParent_Child(this.state.trackID,this.state)});
    }
    else{
      this.setState({is_playing: false});
    }
  }


  siblingMeth(){
    console.log('siblingMeth called on: ',this.state.trackID);
  }



  render() {

    const {playlist} = this.props
    // console.log('HERE COME SOME PLAYLIST: ',playlist);
    const {activeMusicIndex} = this.state
    // console.log('What the hell is an activeMusicIndex: ',activeMusicIndex);
    const activeMusic = playlist[activeMusicIndex]
    // console.log('What the hell is activeMusic: ',activeMusic);

    console.log('**Track ',activeMusic.title,' was rendered**');
    

    //Return here. Go through list of components and flip their images and player status?

    if(this.refs.player){
      console.log("currentsong: ",this.refs.player.currentSrc);
      console.log('activeMusic: ',activeMusic);
      console.log('activeMusicScr: ',activeMusic.src);
      var player = this.refs.player;
      console.log('player: ',player);
      if(this.refs.player.currentSrc !== activeMusic.src){
      this.refs.player.src = activeMusic.src;
      }

      if(player.paused){
        if(this.state.is_playing){
          player.play();
          console.log("player.paused, so play()");
        }
      }
      else if (!this.state.is_playing){
        player.pause();
        console.log("player.pause, so pause()");
      }
    }

    var playerClsName = {
      "fas": true,
      "fa-play": !this.state.is_playing,
      "fa-pause": this.state.is_playing
    };

    return(
      <div className = "player">
        <div className = "inPlayer">
          <img className = "image" src ={activeMusic.cover} />
          <div className = "subject">
            <p> {activeMusic.title} </p>
            <p> / </p>
            <p> {activeMusic.artist}</p>
          </div>



            <div className = "playing" onClick={()=>
              {
                  var mood = this.state.mood;
                  console.log('Button mood: ',mood);
                  var id = this.state.trackID;
                  console.log('Button id: ',id);
                  var options = 
                  {
                    path: 'http://localhost:8888/like/'+mood+'Tracks/'+id,
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

                  // write data to request body
                  req.write('data\n');
                  req.write('data\n');
                  req.end();
              }
            } >
              <i className ="fa fa-thumbs-up"></i>
            </div>




            <div className = "playing" onClick={()=>
            {
                  var mood = this.state.mood;
                  console.log('Button mood: ',mood);
                  var id = this.state.trackID;
                  console.log('Button id: ',id);
                  var options = 
                  {
                    path: 'http://localhost:8888/dislike/'+mood+'Tracks/'+id,
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

                  // write data to request body
                  req.write('data\n');
                  req.write('data\n');
                  req.end();
              }

            } >

              <i className ="fa fa-thumbs-down"></i>
            </div>
          <div className = "playing" onClick={this.togglePlay.bind(this)} >
            <i className ={classnames(playerClsName)}></i>
          </div>
        </div>

        <audio ref = "player" autoPlay={this.state.is_playing} >
           <source src = {activeMusic.src}/>
        </audio>

      </div>
    );
  }
}

document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    console.log('Audios: ',audios);
    console.log('eTarget: ',e.target);
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause();
            // console.log('pause()!');
            //Have all player components that are not the currently playing track (e.target?) switch to play display
            console.log("eventlistener");

        }
    }
}, true);



function classnames(obj){
  var css = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key]){
      css.push(key);
    }
  });
  return css.join(' ');
}

export default Player;
