import connectDB from '/config/database'
import Product from '/models/Products'
import Category from '/models/Categories'
import SubCategory from '/models/SubCategories'

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
	try {
		await connectDB()

		const products = await Product.find({})
			.select('_id title description pricing rating image category subCategory sizes quantity')
			.populate('subCategory', 'param title')
			.populate('category', 'param title')
			.lean()
			.exec()

		return new Response(JSON.stringify(products), {
			status: 200,
		})
	} catch (error) {
		//(error)
		return new Response(error, { status: 500 })
	}
}
