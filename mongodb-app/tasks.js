const { MongoClient } = require('mongodb')

const task = process.argv[2]

const URL = 'mongodb://localhost:27017'
const client = new MongoClient(URL)

async function main() {
	// Use connect method to connect to the server
	await client.connect()
	console.log('Connected successfully to server')

	const tasks = client.db('tasklist').collection('tasks')

	if (task) {
		const result = await tasks.insertOne({ task: task })
		console.log('Inserted task: ', result)
	}
	;(await tasks.find({}).toArray()).forEach((task) => console.log(task))

	return 'done.'
}

main()
	.then(console.log)
	.catch(console.error)
	.finally(() => client.close())

// async function drop() {
// 	await client.connect()

// 	await client.db('tasklist').dropDatabase()
// }

// drop().finally(() => client.close())
