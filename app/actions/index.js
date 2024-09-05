'use server'

import { signIn, signOut } from '/auth'

export async function doCredentialLogin(values) {
	try {
		const response = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false,
		})

		return response
	} catch (error) {
		// console.log(error)
		throw new Error(error)
	}
}

export async function doLogout() {
	await signOut({ redirectTo: '/admin/auth/login' })
}
