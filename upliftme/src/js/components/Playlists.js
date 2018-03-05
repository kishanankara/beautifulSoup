import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import SearchBar from './SearchBar.js';

class Playlists extends Component{
  constructor(){
    super();
    this.state= {name: 'Bill'} //WHAT DOES THIS DO? WHY BILL?
  }
  componentDidMount(){
    let parsd = queryString.parse(window.location.search);
    let accessToken = parsd.access_token;

    if (!accessToken){
      return;
    }
      setTimeout(() =>fetch('https://api.spotify.com/v1/search?q=Sad&type=playlist',{ //runs search query for term Sad and type Playlist
        headers: {'Authorization': 'Bearer ' + accessToken} 
      }).then(response => response.json()).then(data => this.setState({ //.then called on promise (response=>response.json()) which returns another promise which is the data we want
        data:data //We update server data with this data.
      }) ),5000);
  }

  render(){

    //The data that is recieved and set to the state is in the form of an object with a bunch of different attributes.
   
    return(
      <SearchBar/>
      // <div>
      //     {this.state.data?  //This line checks if there is any data. Remember component did mount runs only after 
      //      //the component renders the first time. Once that happens the method is called and the component re renders.
      //      //Once there is a state variable called data the component goes over a map function (look up map for react) and then 
      //      //populates the data on in the component. React re renders the component every time data changes.
      //         <div>
      //         // <SearchBar/>
      //         <p>The data is here : <br/></p><div> {this.state.data.playlists.items.map(m => <img src={m.images[0].url}/>)}</div></div>:
      //       <p1>Loading ... </p1>}

      // </div>
    );

}
}

export default Playlists;
