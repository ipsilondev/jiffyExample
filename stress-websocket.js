const jiffyMultiClient = require('jiffymulticlient');

jiffy = new jiffyMultiClient ();
jiffy.init({transportHTTP: 'fetch', baseURL: 'http://127.0.0.1'});
jiffy.initWebsocket();

var countRequest = 0
var latencySum = 0;
var timestamp = Date.now();

setTimeout(() => {

	setInterval(() => {
		(function (dateMS) {
		jiffy.get('/getImage').then((d) => {
			countRequest++
			var dateNow = Date.now();					
			latencySum += dateNow - dateMS;
			if((dateNow - timestamp) > 1000) {
				console.log("request per second = " + countRequest + " average latency = " + (latencySum / countRequest), latencySum , countRequest);
				latencySum = 0;
				countRequest = 0;
				timestamp = dateNow;
			}
		});
		}(Date.now()));
		}, 0.3);


}, 500);

