import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import Vid from '../../assets/vid.mov';
import Vidwebm from '../../assets/vid.webm';
import Moods from './Moods.js';
import queryString from 'query-string';
//import Search from 'react-search-box';


class SearchBar extends Component{
  
  constructor(props) {
  	super(props);
  	this.state = {query: '', data: {}, inputCleared: false}
  }

  handleChange(change) {
  	const query = change.target.value;

  	this.setState({query});
  	this.runSearch(query);
  }


  runSearch(queryStr){
  	//Handles case where no search term is entered. Data defaults to empty and returns.
  	if(queryStr<=0)
  	{
  		this.setState({ data: {}, inputCleared: true});
  		return
  	}

  	this.setState({ inputCleared: false});

  	let parsd = queryString.parse(window.location.search);
    let accessToken = parsd.access_token;

    if (!accessToken){
      return;
    }

  	const url = 'https://api.spotify.com/v1/search?q=$queryStr&type=track,album,artist';

  	fetch(url, { 
        headers: {'Authorization': 'Bearer ' + accessToken} 
      }).then((response)=>response.json()).then((data)=> {
  		if(this.state.inputCleared || !data || queryStr !== this.state.query)
  		{
  			return
  		}
  		console.log({data});
  		this.setState({data});
  	});
  }

  render() {
    return (
    	<div className = "search-container">
    		<input type="text" className="search-bar" onChange={
    			this.handleChange.bind(this)
    		} /> 
    	</div>


    ); 		
    		
  }
}

export default SearchBar;
