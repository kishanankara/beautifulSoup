import React, { Component } from 'react';
import App, {frontendUri,backendUri} from './App.js';
import ReactTooltip from 'react-tooltip';
//import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';


class SpotifyIcon extends Component{

  componentDidMount()
  {

    console.log(this.props.func)
    console.log(null)
  }


  render(){
    return(
      <div id = 'info-to-right'>
        <div className ="signin-btn" onClick={()=> window.location.href=backendUri+'/login'}>
          <div className = "icon-spotify">
            <img src={this.props.img} data-tip="Login with your Spotify Account" data-effect="solid" className = "logo" width="35" height="35"/>
            <ReactTooltip/>
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
