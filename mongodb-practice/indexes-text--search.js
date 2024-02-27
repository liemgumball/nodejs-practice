require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = `mongodb+srv://liem1762001:${process.env.MONGO_ATLAS_PASSWORD}@liemcluster.oespfl0.mongodb.net/?retryWrites=true&w=majority&appName=liemCluster`

const client = new MongoClient(uri)

run()
	.catch(console.error)
	.finally(async () => {
		await client.close()
	})

async function run() {
	const db = client.db('sample_mflix')
	const movies = db.collection('movies')
	await movies.createIndex({ title: 'text' })
	console.log('run with indexing')

	const stats = movies
		.find({ $text: { $search: 'trek' } })
		.sort({ title: 1 })
		.project({ _id: 0, title: 1 })
		.explain('executionStats')

	console.log(await stats)
}
