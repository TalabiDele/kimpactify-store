import { Schema, model, models } from 'mongoose'
// import Category from './Categories'
// import Product from '/models/Products'

const Product = require('/models/Products')
const Category = require('/models/Categories')

const SubCategorySchema = new Schema({
	param: {
		type: String,
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Products',
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
		ref: 'Categories',
	},
})

const SubCategory =
	models.SubCategory || model('SubCategory', SubCategorySchema)

// module.exports = SubCategory

export default SubCategory
