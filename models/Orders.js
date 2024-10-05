import { Schema, model, models } from 'mongoose'

const productSchema = new Schema()

const OrdersSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		products: [
			{
				title: String,
				quantity: Number,
				size: String,
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
	},
	{
		timestamps: true,
	}
)

const Order = models.Order || model('Order', OrdersSchema)

export default Order

// module.exports = Category
