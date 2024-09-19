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
import { fetchAllSubCategories } from '../utils/requests'
import { BtnCancel } from './Buttons'
import Context from '../context/Context'
import toast from 'react-hot-toast'

const formSchema = z.object({
	title: z.string(),
	// subCategory: z.string(),
	// sizes: z.string().transform((v) => Number(v) || 0),
})

const EditCategories = ({ category, setIsEdit }) => {
	console.log('current', category)

	const [subCategories, setSubCategories] = useState()
	const [loading, setLoading] = useState(true)
	const [currentCategory, setCurrentCategory] = useState()
	const [categorySub, setCategorySub] = useState([])
	const [subIds, setSubIds] = useState([])

	const { fetchCategories } = useContext(Context)

	useEffect(() => {
		if (category?.subCategories.length > 0) {
			setCategorySub(category?.subCategories)
			setSubIds(category?.subCategories)
		}

		const fetchSubCategories = async () => {
			try {
				const resSubCategories = await fetchAllSubCategories()

				console.log(resSubCategories)

				setSubCategories(resSubCategories)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
		}

		// console.log(product)
		fetchSubCategories()
	}, [])

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: category?.title,
			// subCategory: category?.subCategory?._id,
		},
	})

	const addSubCategories = () => {
		console.log('current category', currentCategory)

		const sub = subCategories?.filter((sub) => currentCategory === sub?._id)

		setSubIds([...subIds, currentCategory])

		console.log(subIds, currentCategory)
		// setCategorySub([...categorySub, sub[0]])

		setCategorySub((prevItems) => {
			// Check if the item with the same id exists
			if (!prevItems.some((item) => item._id === sub[0]._id)) {
				return [...prevItems, sub[0]]
			}
			return prevItems
		})

		console.log(categorySub)

		// setCategorySub(categorySub.push(currentCategory))

		// console.log(categorySub)
	}

	const handleSubmit = async (values) => {
		// values.preventDefault()

		console.log(values)

		try {
			const response = await fetch(
				`/api/products/categories/${category?._id}`,
				{
					method: 'PUT',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({ values, subIds }),
				}
			)

			const data = await response.json()

			if (response.ok) {
				fetchCategories()
				setIsEdit(false)
				toast.success(`${data.title} has been edited!`, { duration: 6000 })
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	const handleChange = (value) => {
		setCurrentCategory(value)
	}

	const handleRemove = (id) => {
		const filtered = categorySub.filter((sub) => sub._id !== id)
		const filteredIds = subIds.filter((sub) => sub._id !== id)

		console.log('ids', filteredIds)

		setSubIds(filteredIds)

		setCategorySub(filtered)
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
							<div className=' flex gap-3 w-full'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => {
										return (
											<FormItem className='w-full'>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input
														placeholder='Enter category title'
														type='text'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)
									}}
								/>
							</div>

							<div className='flex gap-4 justify-between w-[100%] items-end'>
								<FormField
									className='w-full'
									control={form.control}
									name='subCategory'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Sub Category</FormLabel>
											<Select
												// onValueChange={field.onChange}
												onValueChange={handleChange}
												defaultValue={field.value}
												onChange={handleChange}
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

export default EditCategories
