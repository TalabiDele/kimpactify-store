'use client'

import React, { useContext, useEffect, useState } from 'react'
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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '/components/shadcn/components/ui/tooltip'
import { Input } from '/components/shadcn/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchAllCategories, fetchAllSubCategories } from '../utils/requests'
import { BtnCancel } from './Buttons'
import Context from '../context/Context'
import toast from 'react-hot-toast'
import { CldUploadWidget } from 'next-cloudinary'
import { IoCloudUploadOutline } from 'react-icons/io5'
import Image from 'next/image'

const formSchema = z.object({
	title: z.string(),
	category: z.string(),
	subCategory: z.string(),
	pricing: z.number(),
	quantity: z.number(),
})

const EditProductModal = ({ product, categories, isEdit, setIsEdit }) => {
	const [subCategories, setSubCategories] = useState()
	const [loading, setLoading] = useState(true)
	const [category, setCategory] = useState()
	const [productSizes, setProductSizes] = useState([])
	const [currentSize, setCurrentSize] = useState()
	const [images, setImages] = useState([])

	const { fetchProducts } = useContext(Context)

	console.log(product)

	useEffect(() => {
		setProductSizes(product?.sizes)
		setImages(product?.image)

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
	}, [])

	const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: product?.title,
			category: product?.category?._id,
			subCategory: product?.subCategory?._id,
			quantity: Math.floor(product?.quantity),
			pricing: Math.floor(product?.pricing),
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
				body: JSON.stringify({ values, sizes: productSizes, images }),
			})

			console.log(response)

			const data = await response.json()

			if (response.ok) {
				toast.success(`${data.title} has been updated!`, {
					duration: 6000,
				})
				setIsEdit(false)
				fetchProducts()
			}

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

	const addSizes = () => {
		setProductSizes((prevItems) => {
			// Check if the item with the same id exists
			if (!prevItems.some((item) => item === currentSize)) {
				return [...prevItems, currentSize]
			}
			return prevItems
		})

		console.log(productSizes)
	}

	const handleUpload = (results) => {
		console.log(results)

		if (results.event === 'success') {
			setImages((prevUrls) => [...prevUrls, results.info.secure_url])
		}

		console.log(images)
	}

	const handleSelectChange = (value) => {
		const filtered = sizes.filter((size) => size === value)

		console.log(filtered[0])

		setCurrentSize(filtered[0])
	}

	const handleRemove = (size) => {
		const filtered = productSizes.filter((sub) => sub !== size)
		// const filteredIds = subIds.filter((sub) => sub._id !== id)

		console.log(filtered)

		// console.log('ids', filteredIds)

		// setSubIds(filteredIds)

		setProductSizes(filtered)
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
								<div className='flex gap-2 items-end'>
									<FormField
										control={form.control}
										name='sizes'
										render={({ field }) => {
											return (
												<FormItem className='w-[7rem]'>
													<FormLabel>Sizes</FormLabel>
													<Select
														onValueChange={handleSelectChange}
														defaultValue={field.value}
														className='w-[50%]'
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder='Select a sizes' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{sizes?.map((size, index) => (
																<SelectItem value={size} key={index}>
																	{size}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)
										}}
									/>

									<div className='' onClick={addSizes}>
										<div className='mt-[1rem] cursor-pointer bg-[#000] text-white rounded-md font-medium p-[0.5rem]'>
											Add
										</div>
									</div>
								</div>
							</div>

							<div className=' flex gap-2 items-center flex-wrap'>
								{productSizes?.map((size, index) => (
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<p
													className=' bg-blue-100 rounded-md p-[0.3rem] text-sm text-blue-600 cursor-pointer'
													key={index}
													onClick={() => handleRemove(size)}
												>
													{size}
												</p>
											</TooltipTrigger>
											<TooltipContent>
												<p>Click to remove</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								))}
							</div>

							<CldUploadWidget
								uploadPreset='kimptrendz'
								onSuccess={(results) => handleUpload(results)}
							>
								{({ open }) => {
									return (
										<div
											className=' bg-transparent border border-[#E5E5E5] rounded-md text-sm font-medium p-[0.5rem] flex items-center gap-2 cursor-pointer w-[50%] justify-center'
											onClick={() => open()}
										>
											<IoCloudUploadOutline fontSize={24} />
											Upload images
										</div>
									)
								}}
							</CldUploadWidget>

							<div className=' flex gap-2'>
								{images?.map((image, index) => (
									<div className=' relative w-[3rem] h-[3rem]' key={index}>
										<Image
											src={image}
											fill
											objectFit='cover'
											className='rounded-md'
										/>
									</div>
								))}
							</div>

							<div className=' items-center justify-between flex-row-reverse flex gap-3 mt-[1rem]'>
								<div className='' onClick={() => setIsEdit(false)}>
									<BtnCancel text={'Cancel'} />
								</div>
								<Button type='submit' className=' py-[0.3rem]'>
									Submit
								</Button>
							</div>
						</form>
					</div>
				</Form>
			</div>
		</div>
	)
}

export default EditProductModal
