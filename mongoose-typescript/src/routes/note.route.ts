import { Router } from 'express'
import noteModel from '../models/note.model'

const noteRouter = Router()

noteRouter.get('/', async (req, res) => {
	try {
		const notes = await noteModel.find().exec()
		res.status(200).json(notes)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

noteRouter.post('/', async (req, res) => {
	try {
		const { title, text } = req.body
		const note = await noteModel.create({
			title,
			text,
		})
		res.status(200).json(note)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

export default noteRouter
