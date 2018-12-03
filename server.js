const express = require('express');
const bodyParser = require('body-parser');
const mosca = require('mosca')
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqttServ = new mosca.Server({});
mqttServ.attachHttpServer(http);


mqttServ.on('clientConnected', function (client) {
    console.log('client connected: ' + client.id);
});

// fired when a message is received
mqttServ.on('published', function (packet, client) {
    console.log('Published: ' + packet.payload.toString('utf8'));
});

mqttServ.on('ready', function () {
    console.log('Mosca server is up and running');
});

app.get('/api/hello', (req, res) => {
    res.send({express: 'Hello From Express'});
});
app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

// Web Sockets
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('message', function (data) {
        console.log(data);
    })

    socket.on('arduino_lightstripe_data', function (data) {
        socket.emit('ui_lightstripe_data', data);
    })

    socket.on('arduino_temperature_data', function (data) {
        socket.emit('ui_temperature_data', data);
    })
});

http.listen(port, () => console.log(`Listening on port ${port}`));