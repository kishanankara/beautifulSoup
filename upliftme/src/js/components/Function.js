import React, {Component} from 'react';
import testing from '../../assets/back.jpg';
import '../../styles/function.css';



class Function extends Component {
  render() {
    return(
      <div className = "bigbox">
        <div className = "playerHere">
          {/*
          <img className = "cover_pic" src = {testing}/> */}
          <div className = "fun_controls">
            <div className = "plus"><i className="fas fa-plus"></i></div>
            <div className = "dislike"><i className="fas fa-thumbs-down"></i></div>
            <div className = "like"><i className="fas fa-thumbs-up"></i></div>
          </div>

          <div className = "box_in_one">
            <div className = "subject_box">
              <div className = "artist_name">Feature</div><br/>
              <div className = "title_name">Coming Soon..</div>
            </div>
            {/* <div className = "progress_time"></div>
            <div className = "progress_bar">
              <div className = "progress">
                <div className = "bar"></div>
              </div>
            </div> */}
          </div>

          {/* <div className ="play_controls">
            <div className = "volume"><i className="fas fa-volume-up"></i></div>
            <div className = "plays"><i className="fas fa-play"></i></div>
            <div className = "loops"><i className="fas fa-undo-alt"></i></div>
          </div> */}

        </div>
      </div>
    );

  }
}

export default Function;
