require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = `mongodb+srv://liem1762001:${process.env.MONGO_ATLAS_PASSWORD}@liemcluster.oespfl0.mongodb.net/?retryWrites=true&w=majority&appName=liemCluster`

const client = new MongoClient(uri)

runEventEmitter()
	.catch(console.error)
	.finally(() => {
		console.log(
			'----------------------------------------------------------------'
		)
		runIterator()
			.catch(console.error)
			.finally(async () => {
				await client.close()
			})
	})

async function runEventEmitter() {
	console.log('running event emitter stream')
	const database = client.db('sample_mflix')
	const movies = database.collection('movies')

	// Open a Change Stream on the "movies" collection
	changeStream = movies.watch()

	// Print change events as they occur
	for await (const change of changeStream) {
		console.log('Received change:\n', change)
		break
	}

	// Close the change stream when done
	await changeStream.close()
	console.log('closed event emitter stream')
}

async function runIterator() {
	console.log('running iterator stream')
	const database = client.db('sample_mflix')
	const movies = database.collection('movies')

	// Open a Change Stream on the "movies" collection
	changeStream = movies.watch()

	// Set up a change stream listener when change events are emitted
	changeStream.on('change', (next) => {
		// Print any change event
		console.log('received a change to the collection: \t', next)
	})

	// Pause before inserting a document
	await simulateAsyncPause()

	// Insert a new document into the collection
	await movies.insertOne({
		title: 'Mai',
	})
	console.log('inserted a new document into the collection')

	// Pause before closing the change stream
	await simulateAsyncPause()

	// Close the change stream and print a message to the console when it is closed
	await changeStream.close()
	console.log('closed iterator stream')
}

function simulateAsyncPause() {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 1000)
	})
}
