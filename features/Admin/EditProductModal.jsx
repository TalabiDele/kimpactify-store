'use client'

import React, { useContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '/shared/ui/shadcn/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '/shared/ui/shadcn/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '/shared/ui/shadcn/components/ui/select'
import { Input } from '/shared/ui/shadcn/components/ui/input'
import { fetchAllCategories } from '/shared/api/requests'
import Context from '/shared/config/Context'
import toast from 'react-hot-toast'
import { CldUploadWidget } from 'next-cloudinary'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { Modal, ModalFooter } from '/shared/ui/Modal'
import { Loader2, Plus, X } from 'lucide-react'
import Image from 'next/image'

const formSchema = z.object({
	title: z.string().min(2, "Title must be at least 2 characters"),
	category: z.string().optional(),
	subCategory: z.string().optional(),
	description: z.string().optional(),
	pricing: z.number().or(z.string().transform(v => Number(v) || 0)),
	quantity: z.number().or(z.string().transform(v => Number(v) || 0)),
})

const EditProductModal = ({ product, categories, isEdit, setIsEdit }) => {
	const [subCategories, setSubCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [category, setCategory] = useState([])
	const [productSizes, setProductSizes] = useState([])
	const [currentSize, setCurrentSize] = useState('')
	const [images, setImages] = useState([])

	const { fetchProducts } = useContext(Context)

	useEffect(() => {
		setProductSizes(product?.sizes || [])
		setImages(product?.image || [])

		const fetchCategories = async () => {
			try {
				const resCategories = await fetchAllCategories()
				setCategory(resCategories)

				// Pre-populate subcategories if editing
				if (product?.category?._id && resCategories) {
					const filtered = resCategories.filter((cat) => product.category._id === cat?._id)
					if (filtered.length > 0) {
						setSubCategories(filtered[0]?.subCategories || [])
					}
				}

			} catch (error) {
				console.error('Error fetching categories', error)
			} finally {
				setLoading(false)
			}
		}

		fetchCategories()
	}, [product])

	const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: product?.title || '',
			description: product?.description || '',
			category: product?.category?._id || '',
			subCategory: product?.subCategory?._id || '',
			quantity: product?.quantity ? Math.floor(product.quantity) : 0,
			pricing: product?.pricing ? Math.floor(product.pricing) : 0,
		},
	})

	const handleSubmit = async (values) => {
		setIsSubmitting(true)
		try {
			const response = await fetch(`/api/products/${product?._id}`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ 
					values, 
					sizes: productSizes, 
					images 
				}),
			})

			const data = await response.json()

			if (response.ok) {
				toast.success(`${data.title || 'Product'} has been updated!`, {
					duration: 6000,
				})
				setIsEdit(false)
				fetchProducts()
			} else {
				toast.error('Failed to update product')
			}
		} catch (error) {
			console.error(error)
			toast.error('Failed to update product')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleOnChange = (values) => {
		form.setValue('category', values)
		const filtered = category?.filter((cat) => values === cat?._id)
		setSubCategories(filtered[0]?.subCategories || [])
		// Reset subcategory when category changes
		form.setValue('subCategory', '')
	}

	const addSizes = () => {
		if (!currentSize) return
		setProductSizes((prevItems) => {
			if (!prevItems.some((item) => item === currentSize)) {
				return [...prevItems, currentSize]
			}
			return prevItems
		})
	}

	const handleRemoveSize = (sizeToRemove) => {
		setProductSizes((prev) => prev.filter(size => size !== sizeToRemove))
	}
	
	const handleRemoveImage = (indexToRemove) => {
		setImages((prev) => prev.filter((_, i) => i !== indexToRemove))
	}

	const handleUpload = (results) => {
		if (results.event === 'success') {
			setImages((prevUrls) => [...prevUrls, results.info.secure_url])
		}
	}

	return (
		<Modal isOpen={true} onClose={() => setIsEdit(false)} title="Edit Product">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6'>
					
					{/* Basic Info */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Title</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter product title'
											className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#ffd138] focus-visible:border-[#ffd138] transition-all rounded-xl text-slate-900 font-medium placeholder:text-slate-400"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='pricing'
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Price ($)</FormLabel>
									<FormControl>
										<Input
											placeholder='0.00'
											type='number'
											className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#ffd138] focus-visible:border-[#ffd138] transition-all rounded-xl text-slate-900 font-medium placeholder:text-slate-400"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Description</FormLabel>
								<FormControl>
									<textarea
										placeholder='Enter product description'
										className="w-full min-h-[100px] p-3 bg-slate-50 border border-slate-200 focus-visible:ring-2 focus-visible:ring-[#ffd138] focus-visible:border-[#ffd138] focus-visible:outline-none transition-all rounded-xl text-slate-900 font-medium placeholder:text-slate-400 custom-scrollbar"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Classification */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Category</FormLabel>
									<Select
										onValueChange={handleOnChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#ffd138] focus:border-[#ffd138] transition-all rounded-xl text-slate-900 font-medium">
												<SelectValue placeholder='Select category' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories?.map((cat) => (
												<SelectItem value={cat._id} key={cat._id || cat.id}>
													{cat.title}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='subCategory'
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Sub Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value || ''}
										value={field.value || ''}
										disabled={!subCategories || subCategories.length === 0}
									>
										<FormControl>
											<SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#ffd138] focus:border-[#ffd138] transition-all rounded-xl text-slate-900 font-medium">
												<SelectValue placeholder={subCategories?.length ? 'Select sub category' : 'Select a category first'} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{subCategories?.map((cat) => (
												<SelectItem value={cat._id} key={cat._id || cat.id}>
													{cat.title}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Inventory & Sizes */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name='quantity'
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Stock</FormLabel>
									<FormControl>
										<Input
											placeholder='0'
											type='number'
											className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#ffd138] focus-visible:border-[#ffd138] transition-all rounded-xl text-slate-900 font-medium placeholder:text-slate-400"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<div>
							<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">Available Sizes</FormLabel>
							<div className="flex gap-2">
								<Select
									onValueChange={(val) => setCurrentSize(val)}
									value={currentSize}
								>
									<SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#ffd138] transition-all rounded-xl text-slate-900 font-medium flex-1">
										<SelectValue placeholder='Select size' />
									</SelectTrigger>
									<SelectContent>
										{sizes.map((size) => (
											<SelectItem value={size} key={size}>
												{size}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Button 
									type="button" 
									onClick={addSizes}
									className="h-12 w-12 p-0 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm transition-all"
								>
									<Plus size={20} />
								</Button>
							</div>
						</div>
					</div>

					{/* Size Tags */}
					{productSizes.length > 0 && (
						<div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
							{productSizes.map((size, index) => (
								<div 
									key={index} 
									className="flex items-center gap-2 bg-white border border-[#ffd138]/50 text-yellow-700 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm"
								>
									{size}
									<button 
										type="button" 
										onClick={() => handleRemoveSize(size)}
										className="text-yellow-600 hover:text-red-500 transition-colors"
									>
										<X size={14} strokeWidth={3} />
									</button>
								</div>
							))}
						</div>
					)}

					{/* Image Upload */}
					<div className="space-y-3">
						<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Product Images</FormLabel>
						<CldUploadWidget
							uploadPreset='kimptrendz'
							onSuccess={handleUpload}
						>
							{({ open }) => (
								<div
									onClick={() => open()}
									className="w-full h-32 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:text-[#ffd138] hover:border-[#ffd138] hover:bg-[#ffd138]/5 transition-all cursor-pointer group"
								>
									<IoCloudUploadOutline size={32} className="mb-2 group-hover:-translate-y-1 transition-transform" />
									<span className="font-medium text-sm">Click to upload imagery</span>
								</div>
							)}
						</CldUploadWidget>

						{images.length > 0 && (
							<div className="flex flex-wrap gap-3 mt-4">
								{images.map((img, index) => (
									<div key={index} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
										<Image src={img} alt={`Upload ${index}`} fill className="object-cover" />
										<button
											type="button"
											onClick={() => handleRemoveImage(index)}
											className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
										>
											<X size={14} strokeWidth={3} />
										</button>
									</div>
								))}
							</div>
						)}
					</div>

					<ModalFooter>
						<Button 
							type='button' 
							variant="outline" 
							onClick={() => setIsEdit(false)}
							className="h-11 px-6 rounded-xl font-bold text-slate-600 border-slate-200 hover:bg-slate-100"
						>
							Cancel
						</Button>
						<Button 
							type='submit' 
							disabled={isSubmitting}
							className="h-11 px-8 rounded-xl font-bold uppercase tracking-widest bg-[#ffd138] hover:bg-[#e6bb32] text-slate-900 transition-all shadow-sm hover:-translate-y-0.5"
						>
							{isSubmitting ? (
								<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
							) : (
								'Save Changes'
							)}
						</Button>
					</ModalFooter>
				</form>
			</Form>
		</Modal>
	)
}

export default EditProductModal
