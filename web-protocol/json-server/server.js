const fs = require('fs')
const path = require('path')
const http = require('http')
const url = require('url')

const jsonFile = path.join(__dirname, 'db.json')
const data = fs.readFileSync(jsonFile, 'utf8')

const server = http.createServer((req, res) => {
	if (req.method !== 'GET') return error(res, 405)

	res.writeHead(200, { 'Content-Type': 'application/json' })
	var source = url.parse(req.url, true).pathname

	const parsed = JSON.parse(data)[source.split('/')[1]]
	res.end(JSON.stringify(parsed))
})

server.listen(3000, 'localhost', () => {
	console.log(`Server listening on port ${server.address().port}`)
})

server.on('error', (error) => {
	console.log('error: ', error)
	server.close()
	server.listen(3000, 'localhost')
})

function error(res, code) {
	res.statusCode = code
	res.end(`{"error": "${http.STATUS_CODES[code]}"}`)
}
