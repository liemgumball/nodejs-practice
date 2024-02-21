const WebSocket = require('ws')

const WebSocketServer = new WebSocket.Server({
	host: 'localhost',
	port: 3000,
})

WebSocketServer.on('connection', (socket, req) => {
	socket.on('message', (message) => {
		console.log('received: %s', message)
		if (message.toString() === 'hello') socket.send('world')
	})
})
