var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require ('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');

	socket.on('message', function (message) {
		console.log('message received:' + message.text);

		message.timestamp = moment().valueOf();
		io.emit('message', message);
	});

	// timestamp property - JavaScript timestamp (ms)  ValueOf

	socket.emit('message', {
		name: 'Current Time: ',
		text: 'This is a chat room.',
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function () {
	console.log('Server started!');
});