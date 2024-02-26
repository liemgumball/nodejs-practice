require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = `mongodb+srv://liem1762001:${process.env.MONGO_ATLAS_PASSWORD}@liemcluster.oespfl0.mongodb.net/?retryWrites=true&w=majority&appName=liemCluster`

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
})

run()
	.catch(console.error)
	.finally(async () => {
		await client.close()
	})

async function run() {
	const db = client.db('sample_mflix')
	const movies = db.collection('movies')

	const query = { runtime: { $lt: 15 } }
	const options = {
		sort: { 'imdb.rating': -1 },
		projection: { _id: 0, title: 1, imdb: 1 },
	}

	const cursor = movies.find(query, options)

	// Print a message if no documents were found
	if ((await movies.countDocuments(query)) === 0) {
		console.log('No documents found!')
	}

	// Print returned documents
	for await (const doc of cursor) {
		console.log(doc)
	}
}
