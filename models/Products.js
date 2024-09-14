import { Schema, model, models } from 'mongoose'
import SubCategory from './SubCategories'
import Category from '/models/Categories'

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
			// ref: Category.modelName,
		},
		subCategory: {
			type: Schema.Types.ObjectId,
			// ref: SubCategory.modelName,
			ref: 'SubCategory',
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

// module.exports = Product

export default Product
