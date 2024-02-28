const express = require('express')
const he = require('he')

const app = express()
app.get('/', (req, res) => {
	const { previous, lang, token } = req.query
	const href = he.encode(`${previous}${token}/${lang}`)

	getServiceStatus((status) => {
		res.send(`
      <h1>Service Status</h1>
      <div id=status>
        ${status}
      </div>
      <div>
        <a href="${href}">Back</a>
      </div>
    `)
	})
})

getServiceStatus = (callback) => {
	const status = 'All systems are running.'
	callback(status)
}

app.listen(3000, () => {
	console.log('Server listening on port 3000')
})
