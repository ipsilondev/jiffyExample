	jiffy = new jiffyMultiClient ();
	jiffy.init({transportHTTP: 'fetch', baseURL: 'http://127.0.0.1'});
	jiffy.get('/getImage').then((d) => {
		return d.blob();
		}).then(loadImageHTTP);
	jiffy.post('/getJSON').then((d) => {
		return d.json();
		}).then(loadJSONHTTP);		
	jiffy.post('/getJSONText/textParameter').then((d) => {
		return d.text();
		}).then(loadTextHTTP);		
	jiffy.initWebsocket();
	setTimeout(() => {
	jiffy.get('/getImage').then((d) => {
		return d.blob();
		}).then(loadImageWS);	
	jiffy.post('/getJSON').then((d) => {
		return d.json();
		}).then(loadJSONWS);		
	jiffy.post('/getJSONText/textParameter').then((d) => {
		return d.text();
		}).then(loadTextWS);							
		}, 1000);
function loadImageHTTP(d) {
			var img = document.createElement('img');
			img.src = URL.createObjectURL(d);
			document.getElementById('httpContainer').appendChild(img);	
}

function loadImageWS(d) {
			var img = document.createElement('img');
			img.src = URL.createObjectURL(d);
			document.getElementById('wsContainer').appendChild(img);	
}		

function loadJSONHTTP(d) {
	var elem = document.createElement('div');
	elem.innerHTML = "" + (typeof d) + ' = ' + JSON.stringify(d);
	document.getElementById('httpContainer').appendChild(elem);		
}

function loadJSONWS(d) {
	var elem = document.createElement('div');
	elem.innerHTML = "" + (typeof d) + ' = ' + JSON.stringify(d);
	document.getElementById('wsContainer').appendChild(elem);		
}

function loadTextHTTP(d) {
	var elem = document.createElement('div');
	elem.innerHTML = "" + (typeof d) + ' = ' + d;
	document.getElementById('httpContainer').appendChild(elem);		
}

function loadTextWS(d) {
	var elem = document.createElement('div');
	elem.innerHTML = "" + (typeof d) + ' = ' + d;
	document.getElementById('wsContainer').appendChild(elem);		
}
var countRequest = 0
var latencySum = 0;
var timestamp = Date.now();
function stressWebsocket(){
	setInterval(() => {
		var dateMS = Date.now();		
		jiffy.get('/getImage').then((d) => {
			countRequest++					
			latencySum += dateMS - Date.now();
			if(Date.now() - timestamp > 10000) {
				console.log("request per second = " + (countRequest / 10) + " average latency = " + (latencySum / countRequest));
				latencySum = 0;
				countRequest = 0;
				timestamp = Date.now();
			}
		});
		}, 1);
}
