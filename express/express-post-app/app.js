const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()

app.use(require('body-parser').urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes'))

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
