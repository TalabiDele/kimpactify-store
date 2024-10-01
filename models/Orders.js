import { Schema, model, models } from 'mongoose'

const OrdersSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Products',
			required: true,
		},
	],
	address: {
		type: String,
	},
	number: {
		type: Number,
	},
	transactionID: {
		type: String,
	},
	deliveryStatus: {
		type: String,
	},
	amount: {
		type: Number,
	},
	orderStatus: {
		type: String,
	},
})

const Order = models.Order || model('Order', OrdersSchema)

export default Order

// module.exports = Category
