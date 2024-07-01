// import connectDB from '../../../../config/database'
// import Product from '../../../../models/Products'
import connectDB from '../../../../../../config/database'
import SubCategory from '../../../../../../models/SubCategories'

export const GET = async (request, { params }) => {
	try {
		await connectDB()

		const slug = params.subCategory

		const categories = await SubCategory.find({ param: slug })

		console.log('categories', categories)

		return new Response(JSON.stringify(categories), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
