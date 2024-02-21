const fs = require('fs')
const http = require('http')
const path = require('path')

const index = fs.readFileSync(path.join(__dirname, 'public', 'index.html'))

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/html')
	res.end(index)
})

server.listen(3001, () => {
	console.log('Server listening on ', server.address().port)
})
