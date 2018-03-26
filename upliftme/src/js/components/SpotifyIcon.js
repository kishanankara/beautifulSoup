import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Spotify from '../../assets/spotify.png';
import queryString from 'query-string';
import Goback from '../../assets/goback.png';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';


class SpotifyIcon extends Component{
  constructor(props){
    super(props);
  }
  spotifyLogin()
  {
    let s = read_cookie('access_token');
    console.log(s);
    if ( s ==null)
    {
      return 'http://upliftme-backend.herokuapp.com/login';
    }
    return 'http://upliftme.herokuapp.com';
  }
  componentDidMount()
  {

    console.log(this.props.func)
    console.log(null)
  }

  {/* This component takes care of the functionality for the Connect with Spotify button on the homepage. */}

  render(){
    return(
      <div id = 'info-to-right'>
        <div class ="signin-btn" onClick={()=> (this.props.func=='Login')?window.location.href='http://upliftme-backend.herokuapp.com/login':window.location.href = 'http://upliftme.herokuapp.com/'}>
          <div class = "icon-spotify">
            {this.props.func=='Login'?
            <div><img src={Spotify} class = "logo" width="35" height="35"/></div>
            :<div><img src = {Goback} class = "logo" width="35" height="35"/></div>}
          </div>
          <div id = 'descript'>
          {this.props.data}
          </div>
        </div>
      </div>
    );
  }
}

export default SpotifyIcon;
