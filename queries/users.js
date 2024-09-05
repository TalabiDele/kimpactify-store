import { User } from '/models/UserModel'

export async function createUser(user) {
	try {
		await User.create(user)
	} catch (error) {
		throw new Error(error)
	}
}
