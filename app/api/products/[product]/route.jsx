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
		await connectDB()
		const { values, sizes, images } = await request.json()

		const product = {
			pricing: values.pricing,
			quantity: values.quantity,
			sizes: sizes,
			title: values.title,
			subCategory: values.subCategory,
			category: values.category,
			image: images,
		}

		const param = params.product

		const existingProduct = await Product.findById(param)
		if (!existingProduct) {
			return new Response('Product does not exist!', { status: 404 })
		}
		const updatedProduct = await Product.findByIdAndUpdate(param, product, {
			new: true,
		})

		await updatedProduct.save()

		return new Response(JSON.stringify(updatedProduct), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response(error, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	try {
		await connectDB()
		const param = params.product

		const productDelete = await Product.findById(param)

		await productDelete.deleteOne()

		return new Response(JSON.stringify({ message: 'Product deleted' }), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response(error, { status: 500 })
	}
}
