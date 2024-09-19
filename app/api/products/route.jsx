import connectDB from '../../../config/database'
import Product from '../../../models/Products'
import cloudinary from '/config/cloudinary'

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
	const { values, category, sizes } = await request.json()

	const product = {
		pricing: values.pricing,
		quantity: values.quantity,
		sizes: sizes,
		title: values.title,
		subCategory: values.subCategory,
		category: category,
	}

	// upload images to cloudinary

	const imageUploadPromises = []

	// for (const image of images) {
	// }

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
