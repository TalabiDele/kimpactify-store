import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from './models/UserModel'
import bcrypt from 'bcryptjs'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				try {
					if (credentials === null) return null

					const user = await User.findOne({
						email: credentials.email,
					})

					if (user) {
						const isMatch = await bcrypt.compare(
							credentials.password,
							user.password
						)

						if (isMatch) {
							return user
						} else {
							throw new Error('Check your password!')
						}
					} else {
						throw new Error('User not found')
					}
				} catch (error) {
					throw new Error(error)
				}
			},
		}),
	],
})
