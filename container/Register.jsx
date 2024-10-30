'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '/components/shadcn/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '/components/shadcn/components/ui/form'
import { Input } from '/components/shadcn/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import logo from '/assets/imgs/kimptrendz-logo.png'
import Image from 'next/image'

const formSchema = z
	.object({
		fullName: z.string(),
		email: z.string().email(),
		password: z.string().min(8),
		confirmPassword: z.string(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword
		},
		{
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		}
	)

const Register = () => {
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	// //(form)

	const handleSubmit = async (values) => {
		setIsLoading(true)

		try {
			const response = await fetch(`/api/register`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					name: values.fullName,
					email: values.email,
					password: values.password,
				}),
			})

			response.status === 201 && router.push('/admin/auth/login')
		} catch (error) {
			//(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<div className='flex items-center h-[100vh] flex-col justify-center'>
				<Image src={logo} width={100} height={100} alt='logo' />
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className='w-[30vw] mx-auto border border-gray-500 rounded-lg p-[1rem] grid gap-3'
				>
					<h1 className=' text-2xl font-bold'>Register</h1>
					<FormField
						control={form.control}
						name='fullName'
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Full name</FormLabel>
									<FormControl>
										<Input placeholder='Enter name' type='text' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)
						}}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='Enter email' type='email' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter password'
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input
										placeholder='Confirm password'
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{isLoading ? (
						<Button disabled className='mt-[1rem]'>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Logging in
						</Button>
					) : (
						<Button type='submit' className='mt-[1rem]'>
							Submit
						</Button>
					)}
				</form>

				<p className=' mt-[1rem] text-sm'>
					Already have an account?{' '}
					<Link href={'/admin/auth/register'} className=' underline'>
						Login
					</Link>
				</p>
			</div>
		</Form>
	)
}

export default Register
