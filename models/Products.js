import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema(
	{
		title: {
			type: String,
			unique: [true, 'Title already exists'],
			required: [true, 'Title is required'],
		},
		description: {
			type: String,
			required: [true, 'Description is required'],
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
			type: String,
			required: [true, 'Category is required'],
		},
		subCategory: {
			type: String,
			required: [true, 'Sub Category is required'],
		},
	},
	{
		timestamps: true,
	}
)

const Product = models.Product || model('Product', ProductSchema)

export default Product
