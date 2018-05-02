import React, {Component} from 'react';
import '../../styles/playlist.css';

class Backtohome extends Component {
  render() {
    return(
      <div className = "smallbox">
      <div className = "back_home"><i className="fas fa-arrow-left" onClick={() => window.location='http://localhost:3000/'}></i></div>
      </div>

    );
  }
}

export default Backtohome;
