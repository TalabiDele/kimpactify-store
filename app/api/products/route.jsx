import connectDB from '../../../config/database'
import Product from '../../../models/Products'
import cloudinary from '/config/cloudinary'

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
	try {
		await connectDB()

		const products = await Product.find({})
			.select('_id title description pricing rating image category subCategory sizes quantity')
			.populate('subCategory', 'param name')
			.populate('category', 'param name')
			.lean()

		return new Response(JSON.stringify(products), {
			status: 200,
		})
	} catch (error) {
		//(error)
		return new Response('Something went wrong', { status: 500 })
	}
}

export const POST = async (request) => {
	try {
		await connectDB()

		const { values, category, sizes, images } = await request.json()

		const product = {
			pricing: values.pricing,
			quantity: values.quantity,
			sizes: sizes,
			title: values.title,
			description: values.description,
			subCategory: values.subCategory,
			category: category,
			image: images,
		}

		const newProduct = new Product(product)
		await newProduct.save()

		return new Response(JSON.stringify(newProduct), {
			status: 200,
		})
	} catch (error) {
		//(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
