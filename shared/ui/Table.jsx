'use client'

import { useContext, useState, useMemo } from 'react'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '/shared/ui/shadcn/components/ui/table'
import { LuMoreHorizontal } from 'react-icons/lu'
import EditProductModal from '/features/Admin/EditProductModal'
import AddProduct from '/features/Admin/AddProduct'
import { MdOutlineDelete } from 'react-icons/md'
import DeleteProduct from '/features/Admin/DeleteProductModal'
import Context from '/shared/config/Context'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'
import { TableLoader } from './TableLoader'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

export function ProductTable({ productItem, categories, searchQuery = '', categoryFilter = 'All' }) {
	const [isEdit, setIsEdit] = useState(false)
	const [productEdit, setProductEdit] = useState()
	const [isDelete, setIsDelete] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

	const { loading } = useContext(Context)

	const handleEdit = (prod) => {
		setIsEdit(true)
		setProductEdit(prod)
	}

	const handleDelete = (item) => {
		setIsDelete(true)
		setProductEdit(item)
	}

	// Filter and sort products
	const filteredProducts = useMemo(() => {
		if (!productItem) return []
		
		let result = [...productItem]

		// Filter by search query
		if (searchQuery) {
			const q = searchQuery.toLowerCase()
			result = result.filter(p => 
				p.title?.toLowerCase().includes(q) || 
				p.category?.title?.toLowerCase().includes(q)
			)
		}

		// Filter by category
		if (categoryFilter !== 'All') {
			result = result.filter(p => p.category?.title === categoryFilter)
		}

		return result
	}, [productItem, searchQuery, categoryFilter])

	// Pagination logic
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
	const paginatedProducts = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage
		return filteredProducts.slice(start, start + itemsPerPage)
	}, [filteredProducts, currentPage])

	// Reset to page 1 if filters change
	useMemo(() => {
		setCurrentPage(1)
	}, [searchQuery, categoryFilter])

	return (
		<div className='mt-4 bg-white rounded-2xl border border-slate-200 flex flex-col'>
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
				<div className="p-4">
					<TableLoader />
				</div>
			) : (
				<>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader className="bg-slate-50/50">
								<TableRow className="border-b border-slate-100">
									<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6'>Name</TableHead>
									<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6'>Category</TableHead>
									<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6'>Sub category</TableHead>
									<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6 text-right'>Quantity</TableHead>
									<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6 text-right'>Amount</TableHead>
									<TableHead className='text-right py-4 px-6'></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedProducts.length > 0 ? paginatedProducts.map((product) => (
									<TableRow key={product._id || product.id} className='border-b border-slate-50 hover:bg-slate-50/80 transition-colors group'>
										<TableCell className='font-semibold text-slate-900 py-4 px-6'>
											{product.title}
										</TableCell>
										<TableCell className="text-slate-600 font-medium py-4 px-6">
											{product?.category?.title}
										</TableCell>
										<TableCell className="text-slate-600 font-medium py-4 px-6">
											{product?.subCategory?.title}
										</TableCell>
										<TableCell className='text-right text-slate-600 font-medium py-4 px-6'>
											{product?.quantity}
										</TableCell>
										<TableCell className='text-right text-slate-600 font-medium py-4 px-6'>
											${product?.pricing}
										</TableCell>
										<TableCell className='py-4 px-6'>
											<div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
												<div
													className='h-8 w-8 flex items-center justify-center transition-all cursor-pointer rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm'
													onClick={() => handleEdit(product)}
													title="Edit Product"
												>
													<LuMoreHorizontal />
												</div>
												<div
													className='h-8 w-8 flex items-center justify-center transition-all cursor-pointer rounded-full bg-white border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 shadow-sm'
													onClick={() => handleDelete(product)}
													title="Delete Product"
												>
													<MdOutlineDelete />
												</div>
											</div>
										</TableCell>
									</TableRow>
								)) : (
									<TableRow>
										<TableCell colSpan={6} className="h-32 text-center text-slate-500 font-medium">
											No products found matching your filters.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>

					{/* Pagination Footer */}
					<div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl">
						<p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
							Showing <span className="text-slate-900">{filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-slate-900">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of <span className="text-slate-900">{filteredProducts.length}</span>
						</p>
						<div className="flex items-center gap-2">
							<button 
								onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
								disabled={currentPage === 1}
								className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
							>
								<FaChevronLeft size={12} />
							</button>
							<div className="text-sm font-bold text-slate-700 px-2">
								{currentPage} <span className="text-slate-400 font-medium">/ {totalPages || 1}</span>
							</div>
							<button 
								onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
								disabled={currentPage === totalPages || totalPages === 0}
								className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
							>
								<FaChevronRight size={12} />
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
