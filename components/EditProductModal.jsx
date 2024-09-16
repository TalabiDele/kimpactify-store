'use client'

import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '/components/shadcn/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '/components/shadcn/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '/components/shadcn/components/ui/select'
import { Input } from '/components/shadcn/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchAllCategories, fetchAllSubCategories } from '../utils/requests'

const formSchema = z.object({
	title: z.string(),
	category: z.string(),
	subCategory: z.string(),
	pricing: z.string().transform((v) => Number(v) || 0),
	quantity: z.string().transform((v) => Number(v) || 0),
	// sizes: z.string().transform((v) => Number(v) || 0),
})

const EditProductModal = ({ product, categories }) => {
	const [subCategories, setSubCategories] = useState()
	const [loading, setLoading] = useState(true)
	const [category, setCategory] = useState()

	console.log(product)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const resCategories = await fetchAllCategories()

				console.log(resCategories)

				setCategory(resCategories)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
		}

		fetchCategories()

		// const fetchSubCategories = async () => {
		// 	try {
		// 		const resSubCategories = await fetchAllSubCategories()

		// 		console.log(resSubCategories)

		// 		setSubCategories(resSubCategories)
		// 	} catch (error) {
		// 		console.error('Error fetching products', error)
		// 	} finally {
		// 		setLoading(false)
		// 	}
		// }

		// console.log(product)
		// fetchSubCategories()
	}, [])

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: product?.title,
			category: product?.category?._id,
			subCategory: product?.subCategory?._id,
			quantity: Math.floor(product?.quantity),
			pricing: Math.floor(product?.pricing),
			// sizes: Math.floor(product?.sizes),
		},
	})

	const handleSubmit = async (values) => {
		// values.preventDefault()

		console.log(values)

		try {
			const response = await fetch(`/api/products/${product?._id}`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ values }),
			})

			const data = response.json()

			console.log(data)

			// response.status === 201 && router.push('/admin/auth/login')
		} catch (error) {
			console.log(error.message)
		}
	}

	const handleOnChange = (values) => {
		// form.onChange()

		console.log(values, category)

		const filtered = category?.filter((cat) => values === cat?._id)

		console.log(filtered)

		setSubCategories(filtered[0]?.subCategories)
	}

	return (
		<div className=' bg-[#00000098] fixed top-0 bottom-0 right-0 left-0 w-[100vw] h-[100vh] z-[1000]'>
			<div className=''>
				<Form {...form}>
					<div className='flex items-center h-[100vh] flex-col justify-center'>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className='w-[30vw] mx-auto bg-white rounded-lg p-[1rem] grid gap-3'
						>
							<div className=' flex gap-3'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input
														placeholder='Enter product title'
														type='text'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)
									}}
								/>
								<FormField
									control={form.control}
									name='pricing'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Price</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter product price'
													type='number'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className=' flex gap-3'>
								<FormField
									control={form.control}
									name='quantity'
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel>Quantity</FormLabel>
												<FormControl>
													<Input
														placeholder='Enter quantity'
														type='number'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)
									}}
								/>
								<FormField
									control={form.control}
									name='sizes'
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel>Sizes</FormLabel>
												<FormControl>
													<Input
														placeholder='Enter sizes'
														type='number'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)
									}}
								/>
							</div>

							<div className='flex gap-4 justify-between w-[100%]'>
								<FormField
									control={form.control}
									className='w-[50%]'
									name='category'
									render={({ field }) => (
										<FormItem className='w-[50%]'>
											<FormLabel>Category</FormLabel>
											<Select
												onValueChange={handleOnChange}
												defaultValue={field.value}
												className='w-[100%]'
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select a category' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{categories?.map((category) => (
														<SelectItem value={category._id} key={category.id}>
															{category.title}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									className='w-[50%]'
									control={form.control}
									name='subCategory'
									render={({ field }) => (
										<FormItem className='w-[50%]'>
											<FormLabel>Sub Category</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select a sub category' />
													</SelectTrigger>
												</FormControl>
												{subCategories?.length < 1 ? (
													<SelectContent>
														<SelectItem
															value={product?.subCategory?._id}
															key={product?.subCategory?.id}
														>
															{product?.subCategory?.title}
														</SelectItem>
													</SelectContent>
												) : (
													<SelectContent>
														{subCategories?.map((category) => (
															<SelectItem
																value={category._id}
																key={category.id}
															>
																{category.title}
															</SelectItem>
														))}
													</SelectContent>
												)}
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button type='submit' className='mt-[1rem]'>
								Submit
							</Button>
						</form>
					</div>
				</Form>
			</div>
		</div>
	)
}

export default EditProductModal
