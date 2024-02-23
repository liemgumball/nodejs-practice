const mongoose = require('mongoose')

const URL = 'mongodb://localhost:27017/customers'

mongoose.connect(URL, {})

const Customer = mongoose.model('Customer', {
	forename: String,
	surname: String,
})

const customer1 = new Customer({
	forename: 'Liem',
	surname: 'Nguyen',
})

customer1.save().then((doc) => {
	console.log('Added new customer:', doc.forename, doc.surname)
	listCustomers()
})

function listCustomers() {
	console.log('Customers:')
	Customer.find().then((doc) => {
		doc.forEach((customer) => {
			console.log(`- ${customer.surname}, ${customer.forename}`)
			mongoose.connection.close()
		})
	})
}
