import connectDB from '../../../../config/database'
import Product from '../../../../models/Products'
import Category from '../../../../models/Categories'

export const GET = async (request) => {
	try {
		await connectDB()

		const categories = await Product.find({})

		return new Response(JSON.stringify(categories), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}

export const POST = async (request) => {
	const { values, subIds } = await request.json()

	const category = {
		param: values.param,
		title: values.title,
		subCategories: subIds,
	}

	console.log(category)

	try {
		await connectDB()

		const newCategory = new Category(category)
		await newCategory.save()

		return new Response(JSON.stringify(newCategory), {
			status: 200,
		})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', { status: 500 })
	}
}
