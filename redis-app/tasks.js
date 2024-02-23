const redis = require('redis')
const client = redis.createClient()

const task = process.argv[2]
console.log(task)

client.on('error', (err) => console.error)
async function main() {
	await client.connect()

	if (task) {
		await addTask(task)
		return 'done'
	} else {
		await listTasks()
		return 'done'
	}

	async function addTask(task) {
		// const key = `Task:${Math.random().toString(32).replace('.', '')}`
		const key = 'Task:1'
		const result = await client.hSet(key, {
			task: task,
		})
		console.log(result)
		await listTasks()
	}

	async function listTasks() {
		console.log('Listing tasks...')
		const list = await client.hGetAll('Task:1')
		console.log(JSON.stringify(list))
	}
}

main()
	.then(console.log)
	.catch(console.error)
	.finally(() => client.quit())
