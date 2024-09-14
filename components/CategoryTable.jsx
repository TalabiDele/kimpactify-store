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
import DeleteProduct from './DeleteProductModal'
import EditCategories from './EditCategory'

export function CategoryTable({ categories }) {
	const [isEdit, setIsEdit] = useState(false)
	const [categoryEdit, setCategoryEdit] = useState()
	const [isDelete, setIsDelete] = useState(false)

	const handleEdit = (category) => {
		setIsEdit(true)

		setCategoryEdit(category)

		console.log(categoryEdit)
	}

	const handleDelete = (item) => {
		setIsDelete(true)
		console.log(item)

		setProductEdit(item)
	}

	return (
		<div className=' mt-[1rem] bg-white rounded-md border border-gray-200 h-[70vh] overflow-y-scroll'>
			{isEdit && categoryEdit && <EditCategories category={categoryEdit} />}

			{isDelete && (
				<DeleteProduct
					isDelete={isDelete}
					setIsDelete={setIsDelete}
					product={productEdit}
				/>
			)}

			<Table className=''>
				<TableHeader>
					<TableRow>
						<TableHead className=''>Name</TableHead>
						<TableHead className='text-right'>No. of Products</TableHead>
						<TableHead className='text-right'>No. of Sub Categories</TableHead>
						<TableHead className='text-right'></TableHead>
						<TableHead className='text-right'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{categories?.map((category) => (
						<TableRow key={category?.id} className=' font-medium'>
							<TableCell className='font-medium'>{category?.title}</TableCell>
							<TableCell className=' text-right'>
								{category?.products.length} products
							</TableCell>
							<TableCell className=' text-right'>
								{category?.subCategories.length} sub categories
							</TableCell>
							<TableCell className='text-right'>
								<div
									className='h-[2rem] w-[2rem] flex items-center justify-center transition-all duration-100 ease-in-out cursor-pointer rounded-full hover:bg-gray-200'
									onClick={() => handleEdit(category)}
								>
									<LuMoreHorizontal />
								</div>
							</TableCell>
							<TableCell className=' '>
								<div
									className='h-[2rem] w-[2rem] flex items-center justify-center transition-all duration-100 ease-in-out cursor-pointer rounded-full text-red-600 hover:bg-gray-200 text-xl'
									onClick={() => handleDelete(category)}
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
