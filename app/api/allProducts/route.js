import connectDB from '/config/database'
import Product from '/models/Products'

export const GET = async (request) => {
	try {
		await connectDB()

		const products = await Product.find({})
			.populate('subCategory')
			.populate('category')
			.exec()

		return new Response(JSON.stringify(products), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response(error, { status: 500 })
	}
}
