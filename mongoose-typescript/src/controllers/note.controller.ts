import { RequestHandler } from 'express'
import noteModel from '../models/note.model'
import { isValidObjectId } from 'mongoose'

export const getNotes: RequestHandler = async (req, res) => {
	try {
		const { q } = req.query
		if (typeof q === 'string') {
			const notes = await noteModel.find({ $text: { $search: q } }).exec()
			res.status(200).json(notes)
		} else res.status(404).json({ error: 'invalid query' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export const getNoteById: RequestHandler = async (req, res) => {
	const { id } = req.params
	if (isValidObjectId(id)) {
		try {
			const note = await noteModel.find({ _id: id }).exec()
			res.status(200).json(note)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	} else res.status(404).json({ error: 'Not valid' })
}

export const addNote: RequestHandler = async (req, res) => {
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
}
