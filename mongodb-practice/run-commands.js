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
	// Get the "sample_mflix" database
	const db = client.db('sample_mflix')

	// Find and print the storage statistics for the "sample_mflix" database using the 'dbStats' command
	const result = await db.command({
		dbStats: 1,
		// getCollectionNames: 1,
		// dbName: 1,
		// raws: 1,
	})

	console.log(result)
}
