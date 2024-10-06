import Order from '/models/Orders'
import connectDB from '/config/database'

export const GET = async (request, { params }) => {
	try {
		await connectDB()

		const param = params.order

		const order = await Order.find({
			_id: param,
		})

		return new Response(JSON.stringify(order), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
