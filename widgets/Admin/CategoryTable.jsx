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
import { MdOutlineDelete } from 'react-icons/md'
import DeleteProduct from '/features/Admin/DeleteProductModal'
import EditCategories from '/features/Admin/EditCategory'
import Context from '/shared/config/Context'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'
import { TableLoader } from '/shared/ui/TableLoader'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

export function CategoryTable({ categories, searchQuery = '' }) {
	const [isEdit, setIsEdit] = useState(false)
	const [categoryEdit, setCategoryEdit] = useState()
	const [isDelete, setIsDelete] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

	const { loading } = useContext(Context)

	const handleEdit = (category) => {
		setIsEdit(true)
		setCategoryEdit(category)
	}

	const handleDelete = (item) => {
		setIsDelete(true)
		setCategoryEdit(item._id)
	}

	// Filter categories
	const filteredCategories = useMemo(() => {
		if (!categories) return []
		
		let result = [...categories]

		if (searchQuery) {
			const q = searchQuery.toLowerCase()
			result = result.filter(c => c.title?.toLowerCase().includes(q))
		}

		return result
	}, [categories, searchQuery])

	// Pagination logic
	const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
	const paginatedCategories = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage
		return filteredCategories.slice(start, start + itemsPerPage)
	}, [filteredCategories, currentPage])

	// Reset to page 1 if filters change
	useMemo(() => {
		setCurrentPage(1)
	}, [searchQuery])

	return (
		<div className='mt-4 bg-white rounded-2xl border border-slate-200 flex flex-col'>
			{isEdit && categoryEdit && (
				<EditCategories category={categoryEdit} setIsEdit={setIsEdit} />
			)}

			{isDelete && (
				<DeleteProduct
					isDelete={isDelete}
					setIsDelete={setIsDelete}
					id={categoryEdit}
					type={'category'}
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
									<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6 text-right'>No. of Products</TableHead>
									<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6 text-right'>No. of Sub Categories</TableHead>
									<TableHead className='py-4 px-6 text-right'></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedCategories.length > 0 ? paginatedCategories.map((category) => (
									<TableRow key={category?.id || category?._id} className='border-b border-slate-50 hover:bg-slate-50/80 transition-colors group'>
										<TableCell className='font-semibold text-slate-900 py-4 px-6'>
											{category?.title}
										</TableCell>
										<TableCell className='text-slate-600 font-medium text-right py-4 px-6'>
											<span className="bg-slate-100 text-slate-700 py-1 px-3 rounded-full text-xs font-bold">
												{category?.products?.length || 0}
											</span>
										</TableCell>
										<TableCell className='text-slate-600 font-medium text-right py-4 px-6'>
											<span className="bg-slate-100 text-slate-700 py-1 px-3 rounded-full text-xs font-bold">
												{category?.subCategories?.length || 0}
											</span>
										</TableCell>
										<TableCell className='py-4 px-6'>
											<div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
												<div
													className='h-8 w-8 flex items-center justify-center transition-all cursor-pointer rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm'
													onClick={() => handleEdit(category)}
													title="Edit Category"
												>
													<LuMoreHorizontal />
												</div>
												<div
													className='h-8 w-8 flex items-center justify-center transition-all cursor-pointer rounded-full bg-white border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 shadow-sm'
													onClick={() => handleDelete(category)}
													title="Delete Category"
												>
													<MdOutlineDelete />
												</div>
											</div>
										</TableCell>
									</TableRow>
								)) : (
									<TableRow>
										<TableCell colSpan={4} className="h-32 text-center text-slate-500 font-medium">
											No categories found matching your search.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>

					{/* Pagination Footer */}
					<div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl">
						<p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
							Showing <span className="text-slate-900">{filteredCategories.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-slate-900">{Math.min(currentPage * itemsPerPage, filteredCategories.length)}</span> of <span className="text-slate-900">{filteredCategories.length}</span>
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
