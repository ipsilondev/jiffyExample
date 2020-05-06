	jiffy = new jiffyMultiClient ();
	jiffy.init({transportHTTP: 'axios', baseURL: 'http://127.0.0.1'});
	jiffy.get('/getImage', { responseType:"blob" }).then(loadImageHTTP);
	jiffy.post('/getJSON').then(loadJSONHTTP);		
	jiffy.post('/getJSONText/textParameter').then(loadTextHTTP);		
	jiffy.initWebsocket();
	setTimeout(() => {
	jiffy.get('/getImage').then(loadImageWS);	
	jiffy.post('/getJSON').then(loadJSONWS);		
	jiffy.post('/getJSONText/textParameter').then(loadTextWS);							
		}, 1000);
function loadImageHTTP(d) {
			var img = document.createElement('img');
			img.src = URL.createObjectURL(d.data);
			document.getElementById('httpContainer').appendChild(img);	
}

function loadImageWS(d) {
			var img = document.createElement('img');
			img.src = URL.createObjectURL(d.data);
			document.getElementById('wsContainer').appendChild(img);	
}		

function loadJSONHTTP(d) {
	var elem = document.createElement('div');
	elem.innerHTML = "" + (typeof d.data) + ' = ' + JSON.stringify(d.data);
	document.getElementById('httpContainer').appendChild(elem);		
}

function loadJSONWS(d) {
	var elem = document.createElement('div');
	elem.innerHTML = "" + (typeof d.data) + ' = ' + JSON.stringify(d.data);
	document.getElementById('wsContainer').appendChild(elem);		
}

function loadTextHTTP(d) {
	var elem = document.createElement('div');
	elem.innerHTML = "" + (typeof d.data) + ' = ' + JSON.stringify(d.data);
	document.getElementById('httpContainer').appendChild(elem);		
}

function loadTextWS(d) {
	var elem = document.createElement('div');
	elem.innerHTML = "" + (typeof d.data) + ' = ' + d.data;
	document.getElementById('wsContainer').appendChild(elem);		
}
