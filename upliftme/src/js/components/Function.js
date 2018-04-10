import React, {Component} from 'react';
import testing from '../../assets/back.jpg';
import '../../styles/playlist.css';

class Function extends Component {
  render() {
    return(

        <div className = "bigbox">
          <div className = "divi">
            <img className = "cov" src = {testing}/>
            <div className ="controls">
              <div className = "loops"><i className="fas fa-undo-alt"></i></div>
              <div className = "plays"><i className="fas fa-play"></i></div>
              <div className = "volume"><i className="fas fa-volume-up"></i></div>
            </div>
          </div>
        </div>

      );
  }
}

export default Function;
