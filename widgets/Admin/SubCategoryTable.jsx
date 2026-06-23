'use client'

import { useState, useMemo } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '/shared/ui/shadcn/components/ui/table'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { LuMoreHorizontal } from 'react-icons/lu'
import { MdOutlineDelete } from 'react-icons/md'

export function SubCategoryTable({ subCategories, searchQuery = '' }) {
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

	// Filter and sort products
	const filteredSubs = useMemo(() => {
		if (!subCategories) return []
		
		let result = [...subCategories]

		// Filter by search query
		if (searchQuery) {
			const q = searchQuery.toLowerCase()
			result = result.filter(sub => 
				sub.title?.toLowerCase().includes(q) || 
				sub.category?.title?.toLowerCase().includes(q)
			)
		}

		return result
	}, [subCategories, searchQuery])

	// Pagination logic
	const totalPages = Math.ceil(filteredSubs.length / itemsPerPage)
	const paginatedSubs = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage
		return filteredSubs.slice(start, start + itemsPerPage)
	}, [filteredSubs, currentPage])

	// Reset to page 1 if filters change
	useMemo(() => {
		setCurrentPage(1)
	}, [searchQuery])

	return (
		<div className='mt-4 bg-white rounded-2xl border border-slate-200 flex flex-col'>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader className="bg-slate-50/50">
						<TableRow className="border-b border-slate-100">
							<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6'>Sub Category</TableHead>
							<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6'>Parent Category</TableHead>
							<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6'>Products</TableHead>
							<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6 text-center'>Count</TableHead>
							<TableHead className='text-right py-4 px-6'></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginatedSubs.length > 0 ? paginatedSubs.map((sub) => (
							<TableRow key={sub._id} className='border-b border-slate-50 hover:bg-slate-50/80 transition-colors group'>
								<TableCell className='py-4 px-6'>
									<p className="font-bold text-slate-900 text-sm">{sub.title}</p>
									<p className="text-xs font-medium text-slate-400 mt-0.5">/{sub.param}</p>
								</TableCell>
								<TableCell className="py-4 px-6">
									{sub.category ? (
										<div className="flex items-center gap-2 flex-wrap">
											<span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest">{sub.category.title}</span>
											<span className="text-slate-300 text-xs">→</span>
											<span className="text-sm font-semibold text-slate-700">{sub.title}</span>
										</div>
									) : (
										<span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Uncategorized</span>
									)}
								</TableCell>
								<TableCell className='py-4 px-6'>
									{sub.products && sub.products.length > 0 ? (
										<div className="flex flex-wrap gap-1 max-w-[260px]">
											{sub.products.slice(0, 3).map(p => (
												<span key={p._id} className="inline-block px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700 truncate max-w-[120px]">
													{p.title}
												</span>
											))}
											{sub.products.length > 3 && (
												<span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-500">
													+{sub.products.length - 3} more
												</span>
											)}
										</div>
									) : (
										<span className="text-xs text-slate-400 font-medium">No products</span>
									)}
								</TableCell>
								<TableCell className='text-center text-slate-600 font-medium py-4 px-6'>
									<span className="font-bold text-slate-800">{sub.products?.length || 0}</span>
									<span className="text-slate-400 text-xs ml-1">items</span>
								</TableCell>
								<TableCell className='py-4 px-6'>
									<div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
										<div
											className='h-8 w-8 flex items-center justify-center transition-all cursor-pointer rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm'
											onClick={() => alert('Edit coming soon')}
											title="Edit Subcategory"
										>
											<LuMoreHorizontal />
										</div>
										<div
											className='h-8 w-8 flex items-center justify-center transition-all cursor-pointer rounded-full bg-white border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 shadow-sm'
											onClick={() => alert('Delete coming soon')}
											title="Delete Subcategory"
										>
											<MdOutlineDelete />
										</div>
									</div>
								</TableCell>
							</TableRow>
						)) : (
							<TableRow>
								<TableCell colSpan={4} className="h-32 text-center text-slate-500 font-medium">
									No subcategories found matching your search.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination Footer */}
			<div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl">
				<p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
					Showing <span className="text-slate-900">{filteredSubs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-slate-900">{Math.min(currentPage * itemsPerPage, filteredSubs.length)}</span> of <span className="text-slate-900">{filteredSubs.length}</span>
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
		</div>
	)
}
