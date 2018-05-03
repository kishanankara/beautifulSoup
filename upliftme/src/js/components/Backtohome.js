import React, {Component} from 'react';
import '../../styles/playlist.css';
import App, {frontendUri,backendUri} from './App.js';


class Backtohome extends Component {
  render() {
    return(
      <div className = "smallbox">
      <div className = "back_home"><i className="fas fa-arrow-left" onClick={() => window.location=frontendUri}></i></div>
      </div>

    );
  }
}
export default Backtohome;
