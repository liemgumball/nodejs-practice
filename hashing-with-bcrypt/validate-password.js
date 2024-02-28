const bcrypt = require('bcrypt')
const password = process.argv[2]
const hash = process.argv[3]

bcrypt
	.compare(password, hash)
	.then((res) => {
		console.log(res)
	})
	.catch(console.error)
