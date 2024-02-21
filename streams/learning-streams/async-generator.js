const { Readable } = require('stream')

async function* generate() {
	yield 'My'
	yield 'name'
	yield 'is'
	yield 'Liem'
}

const readable = Readable.from(generate())
readable.on('data', (chunk) => {
	console.log(chunk)
})
