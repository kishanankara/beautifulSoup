import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';

class Playlists extends Component{
  constructor(){
    super();
    this.state= {name: 'Bill'}
  }
  componentDidMount(){
    let parsd = queryString.parse(window.location.search);
    let accessToken = parsd.access_token;

    if (!accessToken)
      return;
      setTimeout(() =>fetch('https://api.spotify.com/v1/search?q=Sad&type=playlist',{
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response => response.json()).then(data => this.setState({
        data:data
      }) ),5000);
  }

  render(){

    return(
      <div>
          {this.state.data?
              <div><p>The data is here : <br/></p><div> {this.state.data.playlists.items.map(m => <img src={m.images[0].url}/>)}</div></div>:
            <p1>Loading ... </p1>}

      </div>
    );

}
}

export default Playlists;
