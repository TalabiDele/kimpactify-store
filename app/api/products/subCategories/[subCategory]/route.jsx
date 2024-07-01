import SubCategory from '../../../../../models/SubCategories'
import connectDB from '../../../../../config/database'
import Product from '../../../../../models/Products'

export const GET = async (request, { params }) => {
	try {
		await connectDB()

		const param = params.subCategory

		console.log(param)

		const categories = await SubCategory.find({ param: param })

		console.log(categories[0]?._id)

		const products = await Product.find({
			subCategory: categories[0]?._id,
		})

		console.log(products)

		return new Response(JSON.stringify(products), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
