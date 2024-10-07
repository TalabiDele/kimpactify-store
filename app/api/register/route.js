import { NextResponse } from 'next/server'
import { createUser } from '/queries/users'
import bcrypt from 'bcryptjs'
import connectDb from '/config/database'

export const POST = async (request) => {
	const { name, email, password } = await request.json()

	//(name, email, password)

	await connectDb()

	const hashedPassword = await bcrypt.hash(password, 5)

	const newUser = {
		name,
		password: hashedPassword,
		email,
	}

	try {
		await createUser(newUser)
	} catch (error) {
		return new NextResponse(error.message, {
			status: 500,
		})
	}

	return new NextResponse('User has been created', {
		status: 201,
	})
}
