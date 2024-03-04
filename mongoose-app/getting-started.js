const mongoose = require('mongoose')

main().catch((err) => console.log(err))

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/test')
}

const kittySchema = new mongoose.Schema({
	name: String,
})

const Kitten = mongoose.model('Kitten', kittySchema)

const silence = new Kitten({ name: 'Silence' })
console.log(silence.name) // 'Silence'

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function speak() {
	const greeting = this.name
		? 'Meow name is ' + this.name
		: "I don't have a name"
	console.log(greeting)
}
