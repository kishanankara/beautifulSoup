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

    // console.log('MY PROPS: ',props);
    this.state = {
      activeMusicIndex: 0,
      trackID: props.playlist[0].id,
      isLiked : false,
      isDisliked: false,
      probPoints : props.probPoints,
      mood: props.playlist[0].mood,
      is_playing: false
    };
    console.log('trackID: ',this.state.trackID);
  }

  togglePlay(){
    if(this.state.is_playing===false){
      this.setState({is_playing:true});
    }
    else{
      this.setState({is_playing: false});
    }
  }

  render() {

    const {playlist} = this.props
    console.log('HERE COME SOME PLAYLIST: ',playlist);
    const {activeMusicIndex} = this.state
    const activeMusic = playlist[activeMusicIndex]

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
          console.log("play()");
        }
      }
      else if (!this.state.is_playing){
        player.pause();
        console.log("pause()");
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
              <i class ="fa fa-thumbs-up"></i>
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

              <i class ="fa fa-thumbs-down"></i>
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
            console.log('pause()!');
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
