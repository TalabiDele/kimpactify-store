import { Schema, model, models } from 'mongoose'

const CategoriesSchema = new Schema({
	category: {
		type: String,
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Products',
			required: true,
		},
	],
})

const Category = models.Category || model('Category', CategoriesSchema)

export default Category
