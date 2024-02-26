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
	const database = client.db('insertDB')
	const foods = database.collection('foods')

	// Create an array of documents to insert
	const docs = [
		{ name: 'cake', healthy: false },
		{ name: 'lettuce', healthy: true },
		{ name: 'donut', healthy: false },
	]

	// Prevent additional documents from being inserted if one fails
	const options = { ordered: true }

	// Execute insert operation
	const result = await foods.insertMany(docs, options)

	// Print result
	console.log(`${result.insertedCount} documents were inserted`)
}
