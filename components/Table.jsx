'use client'

import { useContext, useState } from 'react'
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
import Context from '/context/Context'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'
import { TableLoader } from './TableLoader'

export function ProductTable({ productItem, categories }) {
	const [isEdit, setIsEdit] = useState(false)
	const [productEdit, setProductEdit] = useState()
	const [isDelete, setIsDelete] = useState(false)

	const { loading, setLoading } = useContext(Context)

	const handleEdit = (prod) => {
		setIsEdit(true)

		setProductEdit(prod)

		//(prod)
	}

	const handleDelete = (item) => {
		setIsDelete(true)
		//(item)

		setProductEdit(item)
	}

	return (
		<div className=' mt-[1rem] bg-white rounded-md border border-gray-200 h-[70vh] overflow-y-scroll'>
			{isEdit && (
				<EditProductModal
					product={productEdit}
					categories={categories}
					setIsEdit={setIsEdit}
				/>
			)}

			{isDelete && (
				<DeleteProduct
					isDelete={isDelete}
					setIsDelete={setIsDelete}
					id={productEdit}
					type={'product'}
				/>
			)}

			{loading ? (
				<TableLoader />
			) : (
				<Table className=''>
					<TableHeader>
						<TableRow>
							<TableHead className=''>
								{loading ? <Skeleton className='h-4 w-[60px]' /> : 'Name'}
							</TableHead>
							<TableHead>
								{loading ? <Skeleton className='h-4 w-[60px]' /> : 'Category'}
							</TableHead>
							<TableHead>
								{loading ? (
									<Skeleton className='h-4 w-[60px]' />
								) : (
									'Sub category'
								)}
							</TableHead>
							<TableHead className='text-right'>
								{loading ? <Skeleton className='h-4 w-[60px]' /> : 'Quantity'}
							</TableHead>
							<TableHead className='text-right'>
								{loading ? <Skeleton className='h-4 w-[60px]' /> : 'Amount'}
							</TableHead>

							<TableHead className='text-right'></TableHead>
							<TableHead className='text-right'></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{productItem?.map((product) => (
							<TableRow key={product.id} className=' font-medium'>
								<TableCell className='font-medium'>
									{loading ? (
										<Skeleton className='h-4 w-[60px]' />
									) : (
										product.title
									)}
								</TableCell>
								<TableCell>
									{loading ? (
										<Skeleton className='h-4 w-[60px]' />
									) : (
										product?.category?.title
									)}
								</TableCell>
								<TableCell>
									{loading ? (
										<Skeleton className='h-4 w-[60px]' />
									) : (
										product?.subCategory?.title
									)}
								</TableCell>

								<TableCell className='text-right'>
									{loading ? (
										<Skeleton className='h-4 w-[60px]' />
									) : (
										product?.quantity
									)}
								</TableCell>
								<TableCell className='text-right'>
									{loading ? (
										<Skeleton className='h-4 w-[60px]' />
									) : (
										product?.pricing
									)}
								</TableCell>
								<TableCell className='text-right '>
									{loading ? (
										<Skeleton className='h-4 w-[60px]' />
									) : (
										<div
											className='h-[2rem] w-[2rem] flex items-center justify-center transition-all duration-100 ease-in-out cursor-pointer rounded-full hover:bg-gray-200'
											onClick={() => handleEdit(product)}
										>
											<LuMoreHorizontal />
										</div>
									)}
								</TableCell>
								<TableCell className=' '>
									{loading ? (
										<Skeleton className='h-4 w-[60px]' />
									) : (
										<div
											className='h-[2rem] w-[2rem] flex items-center justify-center transition-all duration-100 ease-in-out cursor-pointer rounded-full text-red-600 hover:bg-gray-200 text-xl'
											onClick={() => handleDelete(product)}
										>
											<MdOutlineDelete />
										</div>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	)
}
