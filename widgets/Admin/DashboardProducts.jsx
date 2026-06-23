'use client'

import React, { useContext, useState, useMemo } from 'react'
import Heading from '/shared/ui/Heading'
import SearchInput from '/shared/ui/SearchInput'
import { Button } from '/shared/ui/shadcn/components/ui/button'
import { Plus } from 'lucide-react'
import { ProductTable } from '/shared/ui/Table'
import AddProduct from '/features/Admin/AddProduct'
import Context from '/shared/config/Context'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'

const DashboardProducts = () => {
	const [isAdd, setIsAdd] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [categoryFilter, setCategoryFilter] = useState('All')

	const { loading, setLoading, productItem, categories } = useContext(Context)

	// Extract unique categories for filter
	const uniqueCategories = useMemo(() => {
		if (!categories) return []
		return ['All', ...categories.map(c => c.title)]
	}, [categories])

	return (
		<div className=''>
			{isAdd && <AddProduct categories={categories} setIsAdd={setIsAdd} />}
			<div className=''>
				{loading ? (
					<Skeleton className='h-8 w-[200px]' />
				) : (
					<Heading text={'Products Dashboard'} />
				)}
			</div>
			
			<div className='flex flex-col sm:flex-row items-center justify-between mt-10 mb-6 gap-4 bg-white p-4 rounded-2xl border border-slate-200'>
				<div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
					{loading ? (
						<Skeleton className='h-10 w-[300px]' />
					) : (
						<SearchInput placeholder={'products'} value={searchQuery} onChange={setSearchQuery} />
					)}

					{loading ? (
						<Skeleton className='h-10 w-[150px]' />
					) : (
						<select 
							value={categoryFilter}
							onChange={(e) => setCategoryFilter(e.target.value)}
							className="h-[42px] px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-[#ffd138] focus:ring-2 focus:ring-[#ffd138] cursor-pointer text-slate-700 w-full sm:w-auto"
						>
							{uniqueCategories.map(cat => (
								<option key={cat} value={cat}>{cat}</option>
							))}
						</select>
					)}
				</div>
				
				{loading ? (
					<Skeleton className='h-10 w-[120px]' />
				) : (
					<Button 
						onClick={() => setIsAdd(true)}
						className="w-full sm:w-auto h-11 px-6 text-sm font-bold uppercase tracking-widest bg-[#ffd138] hover:bg-[#e6bb32] text-slate-900 transition-all hover:-translate-y-0.5 rounded-xl flex items-center gap-2 shadow-sm"
					>
						<Plus size={18} strokeWidth={2.5} />
						Add Product
					</Button>
				)}
			</div>

			<ProductTable 
				productItem={productItem} 
				categories={categories} 
				searchQuery={searchQuery}
				categoryFilter={categoryFilter}
			/>
		</div>
	)
}

export default DashboardProducts
