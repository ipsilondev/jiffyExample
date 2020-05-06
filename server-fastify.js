const fs = require('fs');
const fastify = require('fastify')({
  //logger: true,
  maxParamLength: 300
});

const jiffyMultiServer = require('jiffymultiserver');
var server = new jiffyMultiServer(fastify, fastify.server, {http: 'fastify'});
server.post('/getJSON', (req, res) => {
	res.send({"obj": 0});
});
server.post('/getJSONText/:text', (req, res) => {
	res.send(JSON.stringify({"obj": req.params.text}));
});

server.get('/getImage', (req, res) => {
	res.type('image/png').send(fs.readFileSync('./img.jpg'));
	});

server.get('/', (req, res) => {
	res.type('text/html').send(fs.readFileSync('./index.html'));
}, {ioDisable: true});	

server.get('/index-axios.html', (req, res) => {
	res.type('text/html').send(fs.readFileSync('./index-axios.html'));
}, {ioDisable: true});	

server.get('/jiffyClient.js', (req, res) => {
	res.type('text/html').send(fs.readFileSync('./node_modules/jiffymulticlient/index.js'));
}, {ioDisable: true});	

server.get('/index.js', (req, res) => {
	res.type('text/html').send(fs.readFileSync('./index.js'));
}, {ioDisable: true});	

server.get('/index-axios.js', (req, res) => {
	res.type('text/html').send(fs.readFileSync('./index-axios.js'));
}, {ioDisable: true});	
	
server.listen(80, (err) => {
	console.log("listening in port 80")
	});
