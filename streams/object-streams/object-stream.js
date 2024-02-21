const { Transform } = require('stream')
const { stringify } = require('ndjson')

const name = new Transform({
	objectMode: true,
	transform: ({ forename, surname }, encoding, callback) => {
		callback(null, { name: forename + ' ' + surname })
	},
})

name.pipe(stringify()).pipe(process.stdout)

name.write({ forename: 'Liem', surname: 'Nguyen' })
name.write({ forename: 'Hoai', surname: 'Huynh' })
