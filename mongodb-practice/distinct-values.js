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
	// Get the database and collection on which to run the operation
	const database = client.db('sample_mflix')
	const movies = database.collection('movies')

	// Specify the document field to find distinct values for
	const fieldName = 'year'

	// Specify an optional query document to narrow results
	const query = { directors: 'Barbra Streisand' }

	// Execute the distinct operation
	const distinctValues = await movies.distinct(fieldName, query)

	// Print the result
	console.log(distinctValues)
}
