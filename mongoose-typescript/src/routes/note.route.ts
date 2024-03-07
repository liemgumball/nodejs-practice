import { Router } from 'express'
import * as Controller from '../controllers/note.controller'

const noteRouter = Router()

noteRouter.get('/', Controller.getNotes)
noteRouter.get('/:id?', Controller.getNoteById)
noteRouter.post('/', Controller.addNote)

export default noteRouter
