import { Schema, model, models } from 'mongoose'
import SubCategory from './SubCategories'

const ProductSchema = new Schema(
	{
		title: {
			type: String,
			unique: [true, 'Title already exists'],
			required: [true, 'Title is required'],
		},
		description: {
			type: String,
			// required: [true, 'Description is required'],
		},
		image: [
			{
				type: String,
			},
		],
		pricing: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
		subCategory: {
			type: Schema.Types.ObjectId,
			ref: SubCategory.modelName,
		},
		quantity: {
			type: Number,
			// required: true,
		},
		sizes: [
			{
				type: String,
			},
		],
	},
	{
		timestamps: true,
	}
)

const Product = models.Product || model('Product', ProductSchema)

export default Product
