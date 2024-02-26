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

	/* Print the estimate of the number of documents in the
	"movies" collection */
	const estimate = await movies.estimatedDocumentCount()
	console.log(
		`Estimated number of documents in the movies collection: ${estimate}`
	)

	/* Print the number of documents in the "movies" collection that
	match the specified query */
	const query = { countries: 'Canada' }
	const countCanada = await movies.countDocuments(query)

	console.log(`Number of movies from Canada: ${countCanada}`)

	const testIndexCount = await movies.countDocuments({}, { hint: '_id_' })
	console.log('testIndexCount: ', testIndexCount)
}
