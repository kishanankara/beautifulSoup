import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import queryString from 'query-string';
//import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';


class SpotifyIcon extends Component{
  // constructor(props){
  //   super(props);
  // }
  // spotifyLogin()
  // {
  //   let s = read_cookie('access_token');
  //   console.log(s);
  //   if ( s ==null)
  //   {
  //     return 'http://localhost:8888/login';
  //   }
  //   return 'http://localhost:3000';
  // }
  componentDidMount()
  {

    console.log(this.props.func)
    console.log(null)
  }


  render(){
    return(
      <div id = 'info-to-right'>
        <div className ="signin-btn" onClick={()=> window.location.href='http://localhost:8888/login'}>
          <div className = "icon-spotify">
            <img src={this.props.img} className = "logo" width="35" height="35"/>
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
