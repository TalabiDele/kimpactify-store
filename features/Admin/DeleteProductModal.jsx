'use client'

import React, { useContext, useState } from 'react'
import { Button } from '/shared/ui/shadcn/components/ui/button'
import Context from '/shared/config/Context'
import toast from 'react-hot-toast'
import { Modal, ModalFooter } from '/shared/ui/Modal'
import { AlertTriangle, Loader2 } from 'lucide-react'

const DeleteProduct = ({ id, isDelete, setIsDelete, type }) => {
	const { fetchProducts, fetchCategories } = useContext(Context)
	const [isDeleting, setIsDeleting] = useState(false)

	const handleDelete = async () => {
		setIsDeleting(true)
		if (type === 'product') {
			try {
				const response = await fetch(`/api/products/${id._id}`, {
					method: 'DELETE',
				})

				if (response.ok) {
					toast.success('Product deleted!', {
						duration: 6000,
					})
					setIsDelete(false)
					fetchProducts()
				} else {
					toast.error('Failed to delete product')
				}
			} catch (error) {
				console.error(error)
				toast.error('Failed to delete product')
			} finally {
				setIsDeleting(false)
			}
		} else {
			try {
				const response = await fetch(`/api/products/categories/${id}`, {
					method: 'DELETE',
				})

				if (response.ok) {
					fetchCategories()
					setIsDelete(false)
					toast.success('Category deleted!', { duration: 6000 })
				} else {
					toast.error('Failed to delete category')
				}
			} catch (error) {
				console.error(error)
				toast.error('Failed to delete category')
			} finally {
				setIsDeleting(false)
			}
		}
	}

	return (
		<Modal 
			isOpen={isDelete} 
			onClose={() => setIsDelete(false)} 
			title={`Delete ${type === 'product' ? 'Product' : 'Category'}`}
			isDestructive={true}
		>
			<div className="flex flex-col items-center justify-center py-6 text-center">
				<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
					<AlertTriangle size={32} className="text-red-600" />
				</div>
				
				<h3 className="text-xl font-bold text-slate-900 mb-2">Are you absolutely sure?</h3>
				<p className="text-slate-500 max-w-[300px] leading-relaxed">
					This action cannot be undone. This will permanently delete the <span className="font-bold text-slate-700">{type}</span> from our servers.
				</p>
			</div>

			<ModalFooter>
				<Button 
					type='button' 
					variant="outline" 
					onClick={() => setIsDelete(false)}
					className="h-11 px-6 rounded-xl font-bold text-slate-600 border-slate-200 hover:bg-slate-100"
				>
					Cancel
				</Button>
				<Button 
					type='button' 
					onClick={handleDelete}
					disabled={isDeleting}
					className="h-11 px-8 rounded-xl font-bold uppercase tracking-widest bg-red-600 hover:bg-red-700 text-white transition-all shadow-sm hover:-translate-y-0.5"
				>
					{isDeleting ? (
						<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...</>
					) : (
						'Delete Permanently'
					)}
				</Button>
			</ModalFooter>
		</Modal>
	)
}

export default DeleteProduct
