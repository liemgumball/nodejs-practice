import express from 'express'
import noteRouter from './routes/note.route'

const app = express()

app.get('/', (req, res) => {
	res.end('Welcome to ' + __dirname)
})

app.use('/notes', noteRouter)

export default app
