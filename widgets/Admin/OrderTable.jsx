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
import moment from 'moment'

export function OrderTable({ orders, searchQuery = '' }) {
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

	// Filter and sort products
	const filteredOrders = useMemo(() => {
		if (!orders) return []
		
		let result = [...orders]

		// Filter by search query
		if (searchQuery) {
			const q = searchQuery.toLowerCase()
			result = result.filter(o => 
				o.name?.toLowerCase().includes(q) || 
				o.email?.toLowerCase().includes(q) ||
				o.transactionID?.toLowerCase().includes(q)
			)
		}

		return result
	}, [orders, searchQuery])

	// Pagination logic
	const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
	const paginatedOrders = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage
		return filteredOrders.slice(start, start + itemsPerPage)
	}, [filteredOrders, currentPage])

	// Reset to page 1 if filters change
	useMemo(() => {
		setCurrentPage(1)
	}, [searchQuery])

	const getStatusColor = (status) => {
		switch (status) {
			case 'Delivered': return 'bg-green-100 text-green-700 border-green-200'
			case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200'
			case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200'
			default: return 'bg-yellow-100 text-yellow-700 border-yellow-200'
		}
	}

	return (
		<div className='mt-4 bg-white rounded-2xl border border-slate-200 flex flex-col'>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader className="bg-slate-50/50">
						<TableRow className="border-b border-slate-100">
							<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6'>Order ID / Date</TableHead>
							<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6'>Customer</TableHead>
							<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6'>Address</TableHead>
							<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6'>Status</TableHead>
							<TableHead className='font-bold text-slate-500 uppercase tracking-wider text-[11px] py-4 px-6 text-right'>Total</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginatedOrders.length > 0 ? paginatedOrders.map((order) => (
							<TableRow key={order._id} className='border-b border-slate-50 hover:bg-slate-50/80 transition-colors group'>
								<TableCell className='py-4 px-6'>
									<p className="font-bold text-slate-900 text-sm">{order.transactionID || order._id.slice(-6).toUpperCase()}</p>
									<p className="text-xs font-medium text-slate-500 mt-0.5">{moment(order.createdAt).format('MMM DD, YYYY')}</p>
								</TableCell>
								<TableCell className="py-4 px-6">
									<p className="font-bold text-slate-900 text-sm">{order.name || 'Unknown'}</p>
									<p className="text-xs font-medium text-slate-500 mt-0.5">{order.email}</p>
								</TableCell>
								<TableCell className="text-slate-600 font-medium py-4 px-6 text-sm max-w-[200px] truncate">
									{order.address || 'N/A'}
								</TableCell>
								<TableCell className='py-4 px-6'>
									<span className={`inline-block px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-widest border ${getStatusColor(order.deliveryStatus || 'Pending')}`}>
										{order.deliveryStatus || 'Pending'}
									</span>
								</TableCell>
								<TableCell className='text-right py-4 px-6'>
									<span className="font-bold text-slate-900">${(order.amount || 0).toFixed(2)}</span>
								</TableCell>
							</TableRow>
						)) : (
							<TableRow>
								<TableCell colSpan={5} className="h-32 text-center text-slate-500 font-medium">
									No orders found matching your search.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination Footer */}
			<div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl">
				<p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
					Showing <span className="text-slate-900">{filteredOrders.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-slate-900">{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</span> of <span className="text-slate-900">{filteredOrders.length}</span>
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
