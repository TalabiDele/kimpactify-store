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
import { fetchAllSubCategories } from '../utils/requests'
import { BtnCancel, BtnDelete } from './Buttons'

const DeleteProduct = ({ id, isDelete, setIsDelete, type }) => {
	console.log(id)

	const handleDelete = async () => {
		if (type === 'product') {
			try {
				const response = await fetch(`/api/products/${id._id}`, {
					method: 'DELETE',
				})

				console.log(response)

				setIsDelete(false)

				// response.status === 201 && router.push('/admin/auth/login')
			} catch (error) {
				console.log(error.message)
			}
		} else {
			try {
				const response = await fetch(`/api/products/categories/${id._id}`, {
					method: 'DELETE',
				})

				console.log(response)

				setIsDelete(false)

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
