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
	const database = client.db('sample_mflix')
	const movies = database.collection('movies')

	/* Delete all documents that match the specified regular
	expression in the title field from the "movies" collection */
	const query = { title: { $regex: 'Santa' } }
	const result = await movies.deleteMany(query)

	// Print the number of deleted documents
	console.log('Deleted ' + result.deletedCount + ' documents')
}
