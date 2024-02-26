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
	const txnResult = await client.withSession(async (session) =>
		session.withTransaction(async (session) => {
			const invColl = client.db('testdb').collection('inventory')
			const recColl = client.db('testdb').collection('orders')

			let total = 0
			for (const item of order) {
				/* Update the inventory for the purchased items. End the
        transaction if the quantity of an item in the inventory is
        insufficient to complete the purchase. */
				const inStock = await invColl.findOneAndUpdate(
					{
						// filter out item
						item: item.item,
						qty: { $gte: item.qty },
					},
					// minus the quantity for 1
					{ $inc: { qty: -item.qty } },
					// include the current session
					{ session }
				)
				if (inStock === null) {
					await session.abortTransaction()
					return 'Item not found or insufficient quantity.'
				}
				const subTotal = item.qty * inStock.price
				total = total + subTotal
			}

			// Create a record of the purchase
			const receipt = {
				date: new Date(),
				items: order,
				total: total,
			}
			await recColl.insertOne(receipt, { session })
			return (
				'Order successfully completed and recorded!\nReceipt:\n' +
				JSON.stringify(receipt, null, 1)
			)
		}, null)
	)

	console.log(txnResult)
}
