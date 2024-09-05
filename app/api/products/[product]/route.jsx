import Category from '../../../../models/Categories'
import connectDB from '../../../../config/database'
import Product from '../../../../models/Products'

export const GET = async (request, { params }) => {
	try {
		await connectDB()

		const param = params.product

		const products = await Product.find({
			_id: param,
		})

		return new Response(JSON.stringify(products), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}

export const PUT = async (request, { params }) => {
	try {
		const { values } = await request.json()

		console.log(values)
		await connectDB()
		const param = params.product
		const existingProduct = await Product.findById(param)
		if (!existingProduct) {
			return new Response('Product does not exist!', { status: 404 })
		}
		const updatedProduct = await Product.findByIdAndUpdate(param, values)
		return new Response(JSON.stringify(updatedProduct), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
