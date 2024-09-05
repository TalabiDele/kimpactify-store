'use client'

import { useState } from 'react'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '/components/shadcn/components/ui/table'
import { LuMoreHorizontal } from 'react-icons/lu'
import EditProductModal from './EditProductModal'
import AddProduct from './AddProduct'
import { MdOutlineDelete } from 'react-icons/md'

export function ProductTable({ productItem, categories }) {
	const [isEdit, setIsEdit] = useState(false)
	const [productEdit, setProductEdit] = useState()
	const [isAdd, setIsAdd] = useState()

	console.log(productItem)

	const handleEdit = (prod) => {
		setIsEdit(true)

		setProductEdit(prod)

		console.log(prod)
	}

	const handleDelete = (item) => {
		console.log(item)
	}

	return (
		<div className=' mt-[1rem] bg-white rounded-md border-gray-400 h-[70vh] overflow-y-scroll'>
			{isEdit && (
				<EditProductModal product={productEdit} categories={categories} />
			)}

			<Table className=''>
				<TableCaption>A list of products.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className=''>Name</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Sub Category</TableHead>
						<TableHead className='text-right'>Quantity</TableHead>
						<TableHead className='text-right'>Amount</TableHead>
						<TableHead className='text-right'></TableHead>
						<TableHead className='text-right'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{productItem?.map((product) => (
						<TableRow key={product.id} className=' font-medium'>
							<TableCell className='font-medium'>{product.title}</TableCell>
							<TableCell>{product.category.title}</TableCell>
							<TableCell>{product.subCategory.title}</TableCell>
							<TableCell className='text-right'>{product.quantity}</TableCell>
							<TableCell className='text-right'>${product.pricing}</TableCell>
							<TableCell className='text-right '>
								<div
									className='h-[2rem] w-[2rem] flex items-center justify-center transition-all duration-100 ease-in-out cursor-pointer rounded-full hover:bg-gray-200'
									onClick={() => handleEdit(product)}
								>
									<LuMoreHorizontal />
								</div>
							</TableCell>
							<TableCell className='text-right '>
								<div
									className='h-[2rem] w-[2rem] flex items-center justify-center transition-all duration-100 ease-in-out cursor-pointer rounded-full text-red-600 hover:bg-gray-200'
									onClick={() => handleDelete(product)}
								>
									<MdOutlineDelete />
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
