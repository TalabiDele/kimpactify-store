'use client'

import React, { useContext, useState } from 'react'
import Heading from '/shared/ui/Heading'
import SearchInput from '/shared/ui/SearchInput'
import { Button } from '/shared/ui/shadcn/components/ui/button'
import { Plus } from 'lucide-react'
import { CategoryTable } from '/widgets/Admin/CategoryTable'
import AddCategory from '/features/Admin/AddCategory'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'
import Context from '/shared/config/Context'

const DashboardCategories = () => {
	const [isAdd, setIsAdd] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')

	const { loading, categories } = useContext(Context)

	return (
		<div>
			{isAdd && <AddCategory setIsAdd={setIsAdd} />}
			<div className=''>
				{loading ? (
					<Skeleton className='h-8 w-[200px]' />
				) : (
					<Heading text={'Categories Dashboard'} />
				)}
			</div>
			
			<div className='flex flex-col sm:flex-row items-center justify-between mt-10 mb-6 gap-4 bg-white p-4 rounded-2xl border border-slate-200'>
				<div className="w-full sm:w-auto">
					{loading ? (
						<Skeleton className='h-10 w-[300px]' />
					) : (
						<SearchInput placeholder={'categories'} value={searchQuery} onChange={setSearchQuery} />
					)}
				</div>
				
				{loading ? (
					<Skeleton className='h-10 w-[150px]' />
				) : (
					<Button 
						onClick={() => setIsAdd(true)}
						className="w-full sm:w-auto h-11 px-6 text-sm font-bold uppercase tracking-widest bg-[#ffd138] hover:bg-[#e6bb32] text-slate-900 transition-all hover:-translate-y-0.5 rounded-xl flex items-center gap-2 shadow-sm"
					>
						<Plus size={18} strokeWidth={2.5} />
						Add Category
					</Button>
				)}
			</div>

			<CategoryTable categories={categories} searchQuery={searchQuery} />
		</div>
	)
}

export default DashboardCategories
