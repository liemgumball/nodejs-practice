const fs = require('fs')

const file = process.argv[2]
const content = process.argv[3]

function printMetadata(file) {
	try {
		const fileStats = fs.statSync(file)
		console.log(fileStats)
		updateFileContent(file, content)
	} catch (err) {
		console.error('Error reading file path:', file)
	}
}

function updateFileContent(file, content) {
	fs.writeFileSync(file, content)
	console.log('Updated file content')
}

printMetadata(file)
console.log(process.argv)
