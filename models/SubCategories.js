import { Schema, model, models } from 'mongoose'

const SubCategorySchema = new Schema({
	param: {
		type: String,
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Product',
			// ref: Product.modelName,
			required: true,
		},
	],
	title: {
		type: String,
	},
	category: {
		type: Schema.Types.ObjectId,
		// ref: Category.modelName,
		ref: 'Category',
	},
})

const SubCategory =
	models.SubCategory || model('SubCategory', SubCategorySchema)

// module.exports = SubCategory

export default SubCategory
