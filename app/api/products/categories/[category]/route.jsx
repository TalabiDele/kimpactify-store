import Category from '../../../../../models/Categories'
import connectDB from '../../../../../config/database'
import Product from '../../../../../models/Products'

export const GET = async (request, { params }) => {
	try {
		await connectDB()

		const param = params.category

		const categories = await Category.find({ param: param })

		const products = await Product.find({
			category: categories[0]._id,
		})
			.populate('subCategory')
			.populate('category')
			.exec()

		return new Response(JSON.stringify(products), {
			status: 200,
		})
	} catch (error) {
		//(error)
		return new Response('Something went wrong', { status: 500 })
	}
}

export const PUT = async (request, { params }) => {
	try {
		await connectDB()
		const { values, subIds } = await request.json()

		// const data = await request.json()

		//(values)

		const subCategoryValues = {
			title: values.title,
			subCategories: subIds,
		}

		// //(values)
		const param = params.category

		// //(values)

		const existingCategory = await Category.findById(param)
		if (!existingCategory) {
			return new Response('Category does not exist!', { status: 404 })
		}
		const updatedCategory = await Category.findByIdAndUpdate(
			param,
			subCategoryValues,
			{
				new: true,
			}
		)

		await updatedCategory.save()

		return new Response(JSON.stringify(updatedCategory), {
			status: 200,
		})
	} catch (error) {
		//(error)
		return new Response(error, { status: 500 })
	}
}

export const DELETE = async (request, { params }) => {
	try {
		await connectDB()
		const param = params.category

		const categoryDelete = await Category.findById(param)

		await categoryDelete.deleteOne()

		return new Response(JSON.stringify({ message: 'Category deleted' }), {
			status: 200,
		})
	} catch (error) {
		//(error)
		return new Response(error, { status: 500 })
	}
}
