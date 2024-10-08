import { Schema, model, models } from 'mongoose'

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
			required: true,
		},
	],
	subCategories: [
		{
			type: Schema.Types.ObjectId,
			ref: 'SubCategory',
		},
	],
	heading: {
		type: String,
	},
	text: {
		type: String,
	},
})

const Category = models.Category || model('Category', CategoriesSchema)

export default Category
