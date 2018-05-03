import React, { Component } from 'react';
import Logo from '../../assets/logo.png';
import App, {frontendUri,backendUri} from './App.js';



//*Component for the Jazz Logo*

class LogoIcon extends Component{
  render(){
    return(
      <div className ="logoIcon">
          <img src={Logo}  className ="logo" width="130" height="55" onClick={() => window.location=frontendUri}/>
          </div>
    );
  }
}

export default LogoIcon;
