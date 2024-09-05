import { Schema, model, models } from 'mongoose'

const SubCategorySchema = new Schema({
	param: {
		type: String,
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Products',
			required: true,
		},
	],
	title: {
		type: String,
	},
})

const SubCategory =
	models.SubCategory || model('SubCategory', SubCategorySchema)

export default SubCategory
