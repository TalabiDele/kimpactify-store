import connectDB from '../../../config/database'
import Category from '../../../models/Categories'

export const GET = async (request) => {
	try {
		await connectDB()

		const categories = await Category.find({}).populate('subCategories').exec()

		return new Response(JSON.stringify(categories), {
			status: 200,
		})
	} catch (error) {
		//(error)
		return new Response(error, { status: 500 })
	}
}
