const http = require('http')

http.get('http://example.com', (res) => res.pipe(process.stdout))

const payload = `{"name":"liem","job":"dev"}`
const opts = {
	hostname: 'www.httpbin.org',
	// port: 80,
	path: '/post',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': Buffer.byteLength(payload),
	},
}

// send the POST request
const req = http.request(opts, (res) => {
	process.stdout.write('Status Code: ' + res.statusCode + '\n')
	process.stdout.write('Body: ')
	res.pipe(process.stdout)
})

// catch any errors that occur on the request
req.on('error', (err) => console.error('Error: ', err))

// finally send the request payload
req.end(payload)
