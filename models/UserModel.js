import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
	name: {
		required: [true, 'Name is required'],
		type: String,
	},
	email: {
		required: [true, 'Email is required'],
		type: String,
	},
	password: {
		required: [true, 'Password is required'],
		type: String,
	},
})

export const User = mongoose.models.User ?? mongoose.model('User', userSchema)
