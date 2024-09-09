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
		const { values } = await request.json()

		// const data = await request.json()

		console.log(values)

		// console.log(values)
		const param = params.product

		// console.log(values)

		const existingProduct = await Product.findById(param)
		if (!existingProduct) {
			return new Response('Product does not exist!', { status: 404 })
		}
		const updatedProduct = await Product.findByIdAndUpdate(param, values, {
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
