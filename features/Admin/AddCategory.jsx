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
import { fetchAllSubCategories } from '/shared/api/requests'
import Context from '/shared/config/Context'
import toast from 'react-hot-toast'
import { Modal, ModalFooter } from '/shared/ui/Modal'
import { Loader2, Plus, X } from 'lucide-react'

const formSchema = z.object({
	title: z.string().min(2, "Title must be at least 2 characters"),
	param: z.string().min(2, "Link param must be at least 2 characters"),
})

const AddCategory = ({ setIsAdd }) => {
	const [subCategories, setSubCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [categorySub, setCategorySub] = useState([])
	const [subIds, setSubIds] = useState([])
	const [currentCategory, setCurrentCategory] = useState(null)

	const { fetchCategories } = useContext(Context)

	useEffect(() => {
		const fetchSubCategories = async () => {
			try {
				const resSubCategories = await fetchAllSubCategories()
				setSubCategories(resSubCategories || [])
			} catch (error) {
				console.error('Error fetching subcategories', error)
			} finally {
				setLoading(false)
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
		setIsSubmitting(true)
		try {
			const response = await fetch(`/api/products/categories`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ values, subIds }),
			})

			if (response.ok) {
				setIsAdd(false)
				fetchCategories()
				toast.success('Category created!', { duration: 6000 })
			} else {
				toast.error('Failed to create category')
			}
		} catch (error) {
			console.error(error)
			toast.error('Failed to create category')
		} finally {
			setIsSubmitting(false)
		}
	}

	const addSubCategories = () => {
		if (!currentCategory) return

		setSubIds((prevItems) => {
			if (!prevItems.some((item) => item === currentCategory._id)) {
				return [...prevItems, currentCategory._id]
			}
			return prevItems
		})

		setCategorySub((prevItems) => {
			if (!prevItems.some((item) => item._id === currentCategory._id)) {
				return [...prevItems, currentCategory]
			}
			return prevItems
		})
	}

	const handleRemove = (id) => {
		setCategorySub((prev) => prev.filter((sub) => sub._id !== id))
		setSubIds((prev) => prev.filter((subId) => subId !== id))
	}

	const handleChange = (value) => {
		const filtered = subCategories.filter((sub) => sub?._id === value)
		setCurrentCategory(filtered[0])
	}

	return (
		<Modal isOpen={true} onClose={() => setIsAdd(false)} title="Create New Category">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6'>
					
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Title</FormLabel>
									<FormControl>
										<Input
											placeholder='e.g. Menswear'
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
							name='param'
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">URL Link Pattern</FormLabel>
									<FormControl>
										<Input
											placeholder='e.g. menswear'
											className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#ffd138] focus-visible:border-[#ffd138] transition-all rounded-xl text-slate-900 font-medium placeholder:text-slate-400"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div>
						<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">Link Sub Categories</FormLabel>
						<div className="flex gap-2">
							<Select onValueChange={handleChange} value={currentCategory?._id || ''}>
								<SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#ffd138] transition-all rounded-xl text-slate-900 font-medium flex-1">
									<SelectValue placeholder='Select a sub category' />
								</SelectTrigger>
								<SelectContent>
									{subCategories?.map((category) => (
										<SelectItem value={category._id} key={category._id}>
											{category.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Button 
								type="button" 
								onClick={addSubCategories}
								className="h-12 w-12 p-0 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm transition-all"
							>
								<Plus size={20} />
							</Button>
						</div>
					</div>

					{categorySub.length > 0 && (
						<div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
							{categorySub.map((sub) => (
								<div 
									key={sub._id} 
									className="flex items-center gap-2 bg-white border border-[#ffd138]/50 text-yellow-700 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm"
								>
									{sub.title}
									<button 
										type="button" 
										onClick={() => handleRemove(sub._id)}
										className="text-yellow-600 hover:text-red-500 transition-colors"
									>
										<X size={14} strokeWidth={3} />
									</button>
								</div>
							))}
						</div>
					)}

					<ModalFooter>
						<Button 
							type='button' 
							variant="outline" 
							onClick={() => setIsAdd(false)}
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
								'Create Category'
							)}
						</Button>
					</ModalFooter>
				</form>
			</Form>
		</Modal>
	)
}

export default AddCategory
