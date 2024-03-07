import express from 'express'
import noteRouter from './routes/note.route'
import { urlencoded, json } from 'body-parser'

const app = express()

app.use(urlencoded({ extended: false }))
app.use(json())

app.get('/', (req, res) => {
	res.end('Welcome to ' + __dirname)
})

app.use('/notes', noteRouter)

app.use((req, res, next) => {
	next(Error('Endpoint not found'))
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req, res, next) => {
	console.error(error)
	let errorMessage = 'An error occurred'
	if (error instanceof Error) {
		errorMessage = error.message
	}

	res.status(500).json({ error: errorMessage })
})

export default app
