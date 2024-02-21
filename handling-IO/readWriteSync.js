const fs = require('fs').promises
const path = require('path')

const filepath = path.join(process.cwd(), 'hello.txt')

async function run() {
	const contents = await fs.readFile(filepath, 'utf8')
	if (contents) console.log('Contents:', contents)
}

run()
