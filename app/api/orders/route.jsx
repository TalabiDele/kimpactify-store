import connectDB from '../../../config/database'
import Order from '/models/Orders'

export const POST = async (request) => {
	try {
		await connectDB()

		const { shippingDetails, result, items } = await request.json()

		const order = {
			name: shippingDetails.name,
			address: shippingDetails.address,
			products: items,
			number: shippingDetails.number,
			transactionID: result.payment.id,
			deliveryStatus: 'pending',
			amount: result.payment.amountMoney.amount,
			email: shippingDetails.email,
			orderStatus: result.status,
		}

		const newOrder = new Order(order)
		await newOrder.save()

		return new Response(JSON.stringify(newOrder), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
