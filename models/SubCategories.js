import { Schema, model, models } from 'mongoose'

const SubCategorySchema = new Schema({
	param: {
		type: String,
	},
	title: {
		type: String,
	},
})

const SubCategory =
	models.SubCategory || model('SubCategory', SubCategorySchema)

export default SubCategory
