import { InferSchemaType, Schema, model } from 'mongoose'

const noteSchema = new Schema(
	{
		title: { type: String, required: true },
		text: String,
	},
	{ timestamps: true }
)

export type Note = InferSchemaType<typeof noteSchema>

export default model<Note>('Note', noteSchema)
