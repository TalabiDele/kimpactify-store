import { Schema, model, models } from 'mongoose'
import SubCategory from './SubCategories'
import Product from './Products'

const CategoriesSchema = new Schema({
	param: {
		type: String,
	},
	title: {
		type: String,
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Products',
			// ref: Product?.modelName,
			required: true,
		},
	],
	subCategories: [
		{
			type: Schema.Types.ObjectId,
			// ref: SubCategory.modelName,
			ref: 'SubCategory',
		},
	],
})

const Category = models.Category || model('Category', CategoriesSchema)

export default Category

// module.exports = Category
