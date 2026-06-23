import mongoose from 'mongoose'

const connectDB = async () => {
	mongoose.set('strictQuery', true)

	// Use readyState to check actual connection status
	// 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
	if (mongoose.connection.readyState === 1) {
		return
	}

	if (mongoose.connection.readyState === 2) {
		// Already connecting, wait for it
		await new Promise((resolve, reject) => {
			mongoose.connection.once('connected', resolve)
			mongoose.connection.once('error', reject)
		})
		return
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			serverSelectionTimeoutMS: 10000,
		})
	} catch (error) {
		console.error('MongoDB connection error:', error)
		throw error // Re-throw so the page shows a real error instead of a timeout
	}
}

export default connectDB
