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
	// Get the database and collection on which to run the operation
	const database = client.db('sample_mflix')
	const movies = database.collection('movies')
	// Create a query for documents where the title contains "The Cat from"
	const query = { title: { $regex: 'The Cat from' } }

	// Create the document that will replace the existing document
	const replacement = {
		title: `The Cat from Sector ${Math.floor(Math.random() * 1000) + 1}`,
	}
	// Execute the replace operation
	const result = await movies.replaceOne(query, replacement)

	// Print the result
	console.log(`Modified ${result.modifiedCount} document(s)`)

	console.log(await movies.findOne({ title: { $regex: 'The Cat from' } }))
}
