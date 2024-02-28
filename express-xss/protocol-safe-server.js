const express = require('express')
const escapeHTML = require('escape-html')

const app = express()
app.get('/', (req, res) => {
	const { previous, lang, token } = req.query
	const href = escapeHTML(`${previous}${token}/${lang}`)

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
