import connectDB from '../../../config/database'
import Product from '../../../models/Products'

export const GET = async (request) => {
	try {
		await connectDB()

		const products = await Product.find({}).populate('subCategory')

		return new Response(JSON.stringify(products), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}

export const POST = async (request) => {
	const { values } = await request.json()

	console.log(values)

	try {
		await connectDB()

		const newProduct = new Product(values)
		await newProduct.save()

		return new Response(JSON.stringify(newProduct), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
