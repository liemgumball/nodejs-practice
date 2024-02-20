const net = require('net')
const dgram = require('dgram')

const HOSTNAME = 'localhost'
const PORT = 3000

net.createServer((socket) => {
	console.log('Client connected!')

	socket.on('data', (name) => {
		console.log('Response sent to ' + name)
		socket.write(`Hello ${name}!`)
	})
}).listen(PORT, HOSTNAME)

const socket = dgram.createSocket('udp6')
socket.bind(PORT)
