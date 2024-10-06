import { Schema, model, models } from 'mongoose'

const productSchema = new Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
	sizes: [{ type: String, required: true }],
})

const OrdersSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		products: [productSchema],
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
