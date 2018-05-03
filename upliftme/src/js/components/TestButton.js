import React, {Component} from 'react';
import '../../styles/playlist.css';


//NOT CURRENTLY BEING USED
var http = require('http')
var isUp = true;
class TestButton extends Component {

  render() {
    return(
      <div className = "smallbox_right">
      <div className = "refresh_playlist"><i class="fa fa-thumbs-up" onClick={()=>
      
		{var options = {
		  path: 'http://localhost:8888/sadTracks/20xK9pC1cCJKnjtJ37YNOQ',
		  method: 'PUT'
		};
		console.log('=======GOT INTO ONCLICK=======');
		console.log('isUp before: ',isUp);
		isUp = !isUp;
		console.log('isUp after: ',isUp);

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
