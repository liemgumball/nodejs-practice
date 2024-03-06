import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app'

const port = process.env.PORT || 3001

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Mongoose Connected!')
		app.listen(port, () => {
			console.log('Listening on port ' + port)
		})
	})
	.catch(console.error)
