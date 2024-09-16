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
	const { values, category } = await request.json()

	const product = {
		pricing: values.pricing,
		quantity: values.quantity,
		sizes: values.sizes,
		title: values.title,
		subCategory: values.subCategory,
		category: category,
	}

	console.log(product)

	try {
		await connectDB()

		const newProduct = new Product(product)
		await newProduct.save()

		return new Response(JSON.stringify(newProduct), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
