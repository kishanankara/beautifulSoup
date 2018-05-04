import React, { Component } from 'react';
import Happy from '../../assets/happy.png';
import Angry from '../../assets/angry.png';
import Chill from '../../assets/chill.png';
import Sad from '../../assets/sad.png';
import App, {frontendUri,backendUri} from './App.js';
import ReactTooltip from 'react-tooltip';


//**This is the Moods component consists of four different moods to choose from upon a click
//redirects the user to a backend server which processes the request to go on the playlist.**
var happy_message = "Hello User! We are glad that you are \n feeling happy today. Click this emoji\n for some Happy songs!";

class Moods extends Component{
  constructor(props){
    super(props);
    this.state={
      data: {}
    }
  }
  render(){
    return(
      <div className ="moods">
          <span className = 'first_half'>
            <img src={Happy} data-tip data-for='happy-mood' className ="happy" width="85" height="85" onClick={()=>window.location=frontendUri+'/Happy'} />
            <img src={Angry} data-tip data-for="angry-mood" className ="angry" width="85" height="85"  onClick={() =>window.location=frontendUri+'/Angry'}/>
          </span>
          <span className = 'second_half'>
            <img src={Sad} data-tip data-for="sad-mood" className ="sad" width="85" height="85" onClick={() => window.location=frontendUri+'/Sad'}/>
            <img src={Chill} data-tip data-for="chill-mood" className ="chill" width="85" height="85" onClick={() => window.location=frontendUri+'/Chill'}/>
          </span>
          <ReactTooltip id='happy-mood' aria-haspopup='true' effect='solid' place='bottom'>
          <p>Songs to bop around to</p>
          </ReactTooltip>
          <ReactTooltip id='angry-mood' aria-haspopup='true' effect='solid' place='bottom'>
          <p>Songs to shake your first to</p>

          </ReactTooltip>
          <ReactTooltip id='sad-mood' aria-haspopup='true' effect='solid' place='bottom'>
          <p>Songs to pluck at your heart chords</p>
          </ReactTooltip>
          <ReactTooltip id='chill-mood' aria-haspopup='true' effect='solid' place='bottom'>
          <p>Songs to relax to</p>
          </ReactTooltip>
      </div>
    );
  }
}

export default Moods;
