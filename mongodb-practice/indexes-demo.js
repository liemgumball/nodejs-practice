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

runWithoutIndex()
	.catch(console.error)
	.finally(() => {
		runWithIndex()
			.catch(console.error)
			.finally(async () => {
				await client.close()
			})
	})

async function runWithoutIndex() {
	console.log('run without indexing')
	const db = client.db('sample_mflix')
	const movies = db.collection('movies')
	await movies.dropIndexes()

	const execution = await movies
		.find({ 'imdb.rating': 8 })
		.explain('executionStats')

	console.log(execution.executionStats)
	/*
		nReturned: 335,
    executionTimeMillis: 25,
    totalKeysExamined: 0,
    totalDocsExamined: 21355
	*/
}

async function runWithIndex() {
	console.log('run with indexing')
	const db = client.db('sample_mflix')
	const movies = db.collection('movies')
	await movies.createIndex('imdb.rating')

	const execution = await movies
		.find({ 'imdb.rating': 8 })
		.explain('executionStats')

	console.log(execution.executionStats)
	/*
		nReturned: 335,
		executionTimeMillis: 1,
		totalKeysExamined: 335,
		totalDocsExamined: 335,
	*/
}
