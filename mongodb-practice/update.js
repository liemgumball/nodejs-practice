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
	// Get the "movies" collection in the "sample_mflix" database
	const database = client.db('sample_mflix')
	const movies = database.collection('movies')

	// Create a filter to update all movies with a 'G' rating
	const filter = { rated: 'G' }

	// Create an update document specifying the change to make
	const updateDoc = {
		$set: {
			random_review: `After viewing I am ${
				100 * Math.random()
			}% more satisfied with life.`,
		},
	}

	// Update the documents that match the specified filter
	const result = await movies.updateMany(filter, updateDoc)
	console.log(`Updated ${result.modifiedCount} documents`)

	// Log the updated document
	const cursor = movies.find(
		{ rated: 'G' },
		{
			projection: { title: 1 },
			limit: 5,
		}
	)
	for await (const doc of cursor) {
		console.log(doc)
	}
}
