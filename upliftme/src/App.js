import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Happy from './assets/happy.png';
import Angry from './assets/angry.png';


class Moods extends Component{
  render(){
    return(
      <div class ="moods">
          <img src={Happy} class ="happy" width="400" height="400"/>
          <img src={Angry} class ="angry" width="400" height="400"/>
      </div>
    );

  }
}

class App extends Component {
  render() {
    return (
      <div className="header">
      <h1> upliftMe </h1>
      <p> How are you feeling today? </p>
      <Moods/>
      </div>
    );
  }
}

export default App;
