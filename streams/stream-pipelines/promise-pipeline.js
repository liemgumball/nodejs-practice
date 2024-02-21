const fs = require('fs')
const stream = require('stream')
const { promisify } = require('util')

const pipeline = promisify(stream.pipeline)

const uppercase = new stream.Transform({
	transform: (chunk, encoding, callback) => {
		callback(null, chunk.toString().toUpperCase())
	},
})

async function run() {
	await pipeline(
		fs.createReadStream('./file.txt'),
		uppercase,
		fs.createWriteStream('./newFile2.txt')
	)
	console.log('pipeline succeeded')
}

run().catch((err) => {
	console.log('pipeline failed: ' + err)
})
