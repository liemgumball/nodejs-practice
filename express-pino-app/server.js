const express = require('express')
const app = express()
const PORT = 3000

const pino = require('pino')()
const logger = require('express-pino-logger')({
	instance: pino,
})

app.use(logger)

app.get('/', (req, res) => {
	const randomNumber = getRandomNumber()
	req.log.info('Generating random number')
	res.send(`${randomNumber}`)
})

app.listen(PORT, () =>
	pino.info(`Server listening on
port ${PORT}`)
)
function getRandomNumber() {
	return Math.floor(Math.random() * 100) + 1
}
