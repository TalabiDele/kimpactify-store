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
})

const EditCategories = ({ category, setIsEdit }) => {
	const [subCategories, setSubCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [currentCategory, setCurrentCategory] = useState(null)
	const [categorySub, setCategorySub] = useState([])
	const [subIds, setSubIds] = useState([])

	const { fetchCategories } = useContext(Context)

	useEffect(() => {
		if (category?.subCategories?.length > 0) {
			setCategorySub(category.subCategories)
			// Assume subCategories here is array of IDs or objects, handling IDs:
			setSubIds(category.subCategories.map(s => s._id || s))
		}

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
	}, [category])

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: category?.title || '',
		},
	})

	const addSubCategories = () => {
		if (!currentCategory) return
		
		const sub = subCategories?.filter((sub) => currentCategory === sub?._id)
		if (sub && sub.length > 0) {
			setSubIds((prev) => {
				if (!prev.includes(currentCategory)) {
					return [...prev, currentCategory]
				}
				return prev
			})

			setCategorySub((prevItems) => {
				if (!prevItems.some((item) => item._id === sub[0]._id)) {
					return [...prevItems, sub[0]]
				}
				return prevItems
			})
		}
	}

	const handleSubmit = async (values) => {
		setIsSubmitting(true)
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
				toast.success(`${data.title || 'Category'} has been edited!`, { duration: 6000 })
			} else {
				toast.error('Failed to edit category')
			}
		} catch (error) {
			console.error(error)
			toast.error('Failed to edit category')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChange = (value) => {
		setCurrentCategory(value)
	}

	const handleRemove = (id) => {
		setCategorySub((prev) => prev.filter((sub) => sub._id !== id))
		setSubIds((prev) => prev.filter((subId) => subId !== id))
	}

	return (
		<Modal isOpen={true} onClose={() => setIsEdit(false)} title="Edit Category">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6'>
					
					<div className="w-full">
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
					</div>

					<div>
						<FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">Link Sub Categories</FormLabel>
						<div className="flex gap-2">
							<Select onValueChange={handleChange} value={currentCategory || ''}>
								<SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#ffd138] transition-all rounded-xl text-slate-900 font-medium flex-1">
									<SelectValue placeholder='Select a sub category' />
								</SelectTrigger>
								<SelectContent>
									{subCategories?.map((cat) => (
										<SelectItem value={cat._id} key={cat._id}>
											{cat.title}
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
									key={sub._id || sub} 
									className="flex items-center gap-2 bg-white border border-[#ffd138]/50 text-yellow-700 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm"
								>
									{sub.title || sub.name || "Sub Category"}
									<button 
										type="button" 
										onClick={() => handleRemove(sub._id || sub)}
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

export default EditCategories
