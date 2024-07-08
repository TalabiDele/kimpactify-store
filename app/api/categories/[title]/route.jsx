import Category from '../../../../models/Categories'
import connectDB from '../../../../config/database'
import Product from '../../../../models/Products'

export const GET = async (request, { params }) => {
	try {
		await connectDB()

		const param = params.title

		const products = await Product.find({
			_id: param,
		})

		const categories = await Category.find({ _id: products[0]?.category })

		return new Response(JSON.stringify(categories), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
