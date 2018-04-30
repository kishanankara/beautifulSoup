import React, {Component} from 'react';
import '../../styles/playlist.css';


var http = require('http')
var isUp = true;
class LikeButton extends Component {

	constructor(props){
		super(props);
		this.state = {
			trackID: props.trackID,
			isEngaged : props.isEngaged,
			probPoints : props.probPoints,
			background-color: #grey;
		}
	}

	// toggleColor(){
	// 	if(this.state.color==#grey){
	// 		this.setState({color:'#39D1B4'},function(){
	// 			console.log('Changed color to black');
	// 		});
	// 	}
	// 	else:
	// 		this.setState({color: #grey},function(){
	// 			console.log('Changed color to black');
	// 		})
	// 	return
	// }


  render() {
    return(
    <div style={{background: this.state.color}}>
      <div className = "playing"><i class="fa fa-thumbs-up" onClick={()=>
      	
		{
			var options = 
			{
			  path: 'http://localhost:8888/sadTracks/20xK9pC1cCJKnjtJ37YNOQ',
			  method: 'PUT'
			};
			var req = http.request(options, function(res) {
			  console.log('STATUS: ' + res.statusCode);
			  console.log('HEADERS: ' + JSON.stringify(res.headers));
			  res.setEncoding('utf8');
			  res.on('data', function (chunk) {
			    console.log('BODY: ' + chunk);
			  });
			});

			req.on('error', function(e) {
			  console.log('problem with request: ' + e.message);
			});

			// write data to request body
			req.write('data\n');
			req.write('data\n');
			req.end();

      }}></i></div>
      </div>
    );
  }
}

export default TestButton;
