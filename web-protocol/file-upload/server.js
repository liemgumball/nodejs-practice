const fs = require('fs')
const { formidable } = require('formidable')
const path = require('path')
const http = require('http')

const form = fs.readFileSync(
	path.join(__dirname, 'public', 'form.html'),
	'utf8'
)

http.createServer((req, res) => {
	if (req.method === 'GET') {
		get(res)
		return
	}
	if (req.method === 'POST') {
		post(req, res)
		return
	}
	return error(405, res)
}).listen(3000)

const get = (res) => {
	res.writeHead(200, {
		'Content-Type': 'text/html',
	})
	res.end(form)
}

const post = (req, res) => {
	if (!/multipart\/form-data/.test(req.headers['content-type']))
		return error(415, res)
	else {
		const form = formidable({
			multiples: true,
			uploadDir: './uploads',
		})

		form.parse(req, (err, fields, files) => {
			if (err) return err
			res.writeHead(200, {
				'Content-Type': 'application/json',
			})
			res.end(JSON.stringify({ fields, files }))
		})
	}
}

const error = (code, res) => {
	res.statusCode = code
	res.end('error ' + code + ' : ' + http.STATUS_CODES[code])
}
