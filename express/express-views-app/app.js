const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes'), (req, res) => {
	console.log('call to index')
	res.end()
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
