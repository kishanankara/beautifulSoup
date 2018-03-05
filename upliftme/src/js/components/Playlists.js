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
    let parsd = queryString.parse(window.location.search);
    let accessToken = parsd.access_token;

    if (!accessToken)
      return;
      fetch('https://api.spotify.com/v1/search?q=Sad&type=playlist',{
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response => response.json()).then(data => this.setState({
        data:data
      }));


  }
  afterMount(){
    let parsd = queryString.parse(window.location.search);
    let accessToken = parsd.access_token;
    if (!accessToken)
      return;
    fetch(this.state.data.playlists.items[0].tracks.href,{
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json()).then(tracks => this.setState({
      tracks:tracks
    }));
  }

  render(){                                           //https://open.spotify.com/track/4sPmO7WMQUAf45kwMOtONw?si=aQkPn1JdSYq708hvAg9-bQ

    return(
      <div>
          {this.state.data ?
            <div>
              {this.afterMount()}
                {this.state.tracks?
                  <div>
                    <p>The data is here :<br/></p>
                      <div>{this.state.tracks.items.map(m => <div> <img src={m.track.album.images[0].url} height="400px" padding="10px"/>
                      <br/>
                      <audio controls>
                        <source src={m.track.preview_url} type="audio/mp3"/></audio></div>
                      )}
                      </div>
                  </div>
              :<p2>Loading ...</p2>}
          </div>
              :<p1>Loading ... </p1>

            }
      </div>
    );
}
}

export default Playlists;
