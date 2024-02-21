const http = require('http')
const fs = require('fs')
const path = require('path')

const HOSTNAME = 'localhost'
const PORT = 3000
const form = fs.readFileSync(path.join(__dirname, 'public', 'form.html'))

const server = http.createServer((req, res) => {
	console.log(req.headers['content-type'])
	if (req.method === 'POST') return post(req, res)
	if (req.method !== 'GET') return error(res, 405)

	if (req.url === '/todo') return todo(res)

	if (req.url === '/') return index(res)

	error(res, 404)
})

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server listening on port ${server.address().port}`)
})

function error(res, code) {
	res.statusCode = code
	res.end(`{"error": "${http.STATUS_CODES[code]}"}`)
}

function todo(res) {
	res.end('[{"task_id": 1, "description": "walkdog"}]}')
}

function index(res) {
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.end(form)
}

function post(req, res) {
	if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
		error(res, 415)
		return
	}

	let input = ''
	req.on('data', (chunk) => {
		input += chunk.toString()
	})

	req.on('end', () => {
		console.log(input)
		res.end(http.STATUS_CODES[200])
	})
}
