import Category from '../../../../../models/Categories'
import connectDB from '../../../../../config/database'
import Product from '../../../../../models/Products'

export const GET = async (request, { params }) => {
	try {
		await connectDB()

		const param = params.category

		const categories = await Category.find({ param: param })

		const products = await Product.find({
			category: categories[0]._id,
		})

		return new Response(JSON.stringify(products), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
