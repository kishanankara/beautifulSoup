import React, {Component} from 'react';
import '../../styles/playlist.css';

class RefreshPlaylist extends Component {
  render() {
    return(
      <div className = "smallbox_right">
      <div className = "refresh_playlist"><i className="fas fa-sync" onClick={() => window.location=window.location.pathname}></i></div>
      </div>
    );
  }
}

export default RefreshPlaylist;
