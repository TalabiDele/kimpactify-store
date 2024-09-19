'use client'

import React, { useContext } from 'react'
import { BtnCancel, BtnDelete } from './Buttons'
import Context from '../context/Context'
import toast from 'react-hot-toast'

const DeleteProduct = ({ id, isDelete, setIsDelete, type }) => {
	console.log(id)

	const { fetchProducts, fetchCategories } = useContext(Context)

	const handleDelete = async () => {
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
				}
			} catch (error) {
				console.log(error.message)
			}
		} else {
			try {
				const response = await fetch(`/api/products/categories/${id}`, {
					method: 'DELETE',
				})

				console.log(response)

				if (response.ok) {
					fetchCategories()
					setIsDelete(false)
					toast.success('Category deleted!', { duration: 6000 })
				}

				// response.status === 201 && router.push('/admin/auth/login')
			} catch (error) {
				console.log(error.message)
			}
		}
	}

	return (
		<div className=' bg-[#00000098] fixed top-0 bottom-0 right-0 left-0 w-[100vw] h-[100vh] z-[1000]'>
			<div className=''>
				<div className='flex items-center h-[100vh] flex-col justify-center'>
					<div className='w-[30vw] mx-auto bg-white rounded-lg p-[1rem] grid gap-3 justify-items-center'>
						<h1 className=''>Are you sure you want to delete {type}?</h1>
						<div className=' flex gap-4'>
							<div className='' onClick={() => setIsDelete(false)}>
								<BtnCancel text={'Cancel'} />
							</div>
							<div className='' onClick={handleDelete}>
								<BtnDelete text={'Delete'} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeleteProduct
