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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '/components/shadcn/components/ui/tooltip'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchAllSubCategories } from '../utils/requests'
import { BtnCancel } from './Buttons'

const formSchema = z.object({
	title: z.string(),
	param: z.string(),
})

const AddCategory = ({ product, categories, setIsAdd }) => {
	const [subCategories, setSubCategories] = useState()
	const [loading, setLoading] = useState(true)
	const [category, setCategory] = useState()
	const [categorySub, setCategorySub] = useState([])
	const [subIds, setSubIds] = useState([])
	const [currentCategory, setCurrentCategory] = useState()

	useEffect(() => {
		const fetchSubCategories = async () => {
			try {
				const resSubCategories = await fetchAllSubCategories()

				console.log(resSubCategories)

				setSubCategories(resSubCategories)

				// setIsAdd(false)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)

				// setIsAdd(false)
			}
		}
		fetchSubCategories()
	}, [])

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			param: '',
		},
	})

	const handleSubmit = async (values) => {
		// values.preventDefault()

		console.log(values)

		try {
			const response = await fetch(`/api/products/categories`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ values, subIds }),
			})

			const data = response.json()

			if (response.ok) {
				setIsAdd(false)
			}

			console.log(data)

			// response.status === 201 && router.push('/admin/auth/login')
		} catch (error) {
			console.log(error.message)
		}
	}

	const addSubCategories = () => {
		console.log(subCategories)

		setSubIds((prevItems) => {
			// Check if the item with the same id exists
			if (!prevItems.some((item) => item === currentCategory._id)) {
				return [...prevItems, currentCategory._id]
			}
			return prevItems
		})

		console.log(subIds)

		setCategorySub((prevItems) => {
			// Check if the item with the same id exists
			if (!prevItems.some((item) => item._id === currentCategory._id)) {
				return [...prevItems, currentCategory]
			}
			return prevItems
		})
	}

	const handleRemove = (id) => {
		const filtered = categorySub.filter((sub) => sub._id !== id)
		const filteredIds = subIds.filter((sub) => sub._id !== id)

		console.log('ids', filteredIds)

		setSubIds(filteredIds)

		setCategorySub(filtered)
	}

	const handleChange = (value) => {
		const filtered = subCategories.filter((sub) => sub?._id === value)

		console.log(filtered[0])

		setCurrentCategory(filtered[0])
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
									name='param'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Link</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter link'
													type='text'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='flex gap-4 justify-between w-[100%] items-end'>
								<FormField
									className=''
									control={form.control}
									name='subCategory'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Sub Category</FormLabel>
											<Select
												onValueChange={handleChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select a sub category' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{subCategories?.map((category) => (
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

								<div className='' onClick={addSubCategories}>
									<div className='mt-[1rem] cursor-pointer bg-[#000] text-white rounded-md font-medium p-[0.5rem]'>
										Add
									</div>
								</div>
							</div>

							<div className=' flex gap-2 items-center flex-wrap'>
								{categorySub?.map((sub) => (
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<p
													className=' bg-blue-100 rounded-md p-[0.3rem] text-sm text-blue-600 cursor-pointer'
													key={sub?._id}
													onClick={() => handleRemove(sub._id)}
												>
													{sub?.title}
												</p>
											</TooltipTrigger>
											<TooltipContent>
												<p>Click to remove</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								))}
							</div>

							<div className=' items-center justify-between flex-row-reverse flex gap-3 mt-[1rem]'>
								<div className='' onClick={() => setIsAdd(false)}>
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

export default AddCategory
