import React, { Component } from 'react';
import Happy from '../../assets/happy.png';
import Angry from '../../assets/angry.png';
import Chill from '../../assets/chill.png';
import Sad from '../../assets/sad.png';
import App, {frontendUri,backendUri} from './App.js';


//**This is the Moods component consists of four different moods to choose from upon a click
//redirects the user to a backend server which processes the request to go on the playlist.**

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
            <img src={Happy}  className ="happy" width="85" height="85" onClick={()=>window.location=frontendUri+'/Happy'} />
            <img src={Angry} className ="angry" width="85" height="85"  onClick={() =>window.location=frontendUri+'/Angry'}/>
          </span>
          <span className = 'second_half'>
            <img src={Sad} className ="sad" width="85" height="85" onClick={() => window.location=frontendUri+'/Sad'}/>
            <img src={Chill} className ="chill" width="85" height="85" onClick={() => window.location=frontendUri+'/Chill'}/>
          </span>
      </div>
    );
  }
}

export default Moods;
