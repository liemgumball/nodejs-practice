const nm = require('nodemailer')

const transporter = nm.createTransport({
	host: 'localhost',
	port: 4321,
})

transporter.sendMail(
	{
		from: 'beth@example.com',
		to: 'laddie@example.com',
		subject: 'Hello',
		text: 'Hello world!',
	},
	(err, info) => {
		if (err) console.error(err)
		else console.log('Message sent: ', info)
	}
)
