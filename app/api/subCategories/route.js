import connectDB from '../../../config/database'
// import Category from '../../../models/Categories'
import SubCategory from '/models/SubCategories'

export const GET = async (request) => {
	try {
		await connectDB()

		const categories = await SubCategory.find({})

		return new Response(JSON.stringify(categories), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
