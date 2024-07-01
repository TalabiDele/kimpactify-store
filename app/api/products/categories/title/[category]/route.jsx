// import connectDB from '../../../../config/database'
// import Product from '../../../../models/Products'
import connectDB from '../../../../../../config/database'
import Category from '../../../../../../models/Categories'

export const GET = async (request, { params }) => {
	try {
		await connectDB()

		const slug = params.category

		console.log(slug)

		const categories = await Category.find({ param: slug })

		return new Response(JSON.stringify(categories), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
