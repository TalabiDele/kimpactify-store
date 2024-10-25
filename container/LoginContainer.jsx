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
import { doCredentialLogin } from '/app/actions'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

const LoginContainer = () => {
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	// //(form)

	const handleSubmit = async (values) => {
		setIsLoading(true)

		try {
			const response = await doCredentialLogin(values)

			// //(response)

			if (!!response.error) {
				//(response)
				toast.error('Invalid credentials', {
					duration: 5000,
				})
			} else {
				router.push('/admin/products')
			}
		} catch (error) {
			toast.error('Invalid credentials', {
				duration: 5000,
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<div className='flex items-center h-[100vh] flex-col justify-center gap-4'>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className='w-[30vw] mx-auto border border-gray-500 rounded-lg p-[1rem] grid gap-3'
				>
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
					{isLoading ? (
						<Button disabled className='mt-[1rem]'>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Logging in
						</Button>
					) : (
						<Button type='submit' className='mt-[1rem]'>
							Login
						</Button>
					)}
				</form>
				<p className=' mt-[1rem] text-sm'>
					Don't have an account?{' '}
					<Link href={'/admin/auth/register'} className=' underline'>
						Register
					</Link>
				</p>
			</div>
		</Form>
	)
}

export default LoginContainer
