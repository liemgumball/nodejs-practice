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
	const theaters = database.collection('theaters')
	// Insert a new document into the "theaters" collection
	const result = await theaters.bulkWrite([
		{
			insertOne: {
				document: {
					location: {
						address: {
							street1: '3 Main St.',
							city: 'Anchorage',
							state: 'AK',
							zipcode: '99501',
						},
					},
				},
			},
		},
		{
			insertOne: {
				document: {
					location: {
						address: {
							street1: '75 Penn Plaza',
							city: 'New York',
							state: 'NY',
							zipcode: '10001',
						},
					},
				},
			},
		},
		{
			// Update documents that match the specified filter
			updateMany: {
				filter: { 'location.address.zipcode': '44011' },
				update: { $set: { is_in_ohio: true } },
				upsert: true,
			},
		},
		{
			// Delete a document that matches the specified filter
			deleteOne: {
				filter: { 'location.address.street1': '221b Baker St' },
			},
		},
	])
	// Log the result of the bulk write operation
	console.log(result)
}
