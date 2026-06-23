'use client'

import React, { useState } from 'react'
import Heading from '/shared/ui/Heading'
import SearchInput from '/shared/ui/SearchInput'
import { Button } from '/shared/ui/shadcn/components/ui/button'
import { Plus } from 'lucide-react'
import { SubCategoryTable } from '/widgets/Admin/SubCategoryTable'

const DashboardSubCategories = ({ subCategories }) => {
	const [searchQuery, setSearchQuery] = useState('')

	return (
		<div>
			<div className='mt-4'>
				<Heading text={'Sub Categories Dashboard'} />
			</div>
			
			<div className='flex flex-col sm:flex-row items-center justify-between mt-10 mb-6 gap-4 bg-white p-4 rounded-2xl border border-slate-200'>
				<div className="w-full sm:w-auto">
					<SearchInput placeholder={'Search subcategories...'} value={searchQuery} onChange={setSearchQuery} />
				</div>
				
				<Button 
					onClick={() => alert("Add SubCategory modal coming soon!")}
					className="w-full sm:w-auto h-11 px-6 text-sm font-bold uppercase tracking-widest bg-[#ffd138] hover:bg-[#e6bb32] text-slate-900 transition-all hover:-translate-y-0.5 rounded-xl flex items-center gap-2 shadow-sm"
				>
					<Plus size={18} strokeWidth={2.5} />
					Add Sub Category
				</Button>
			</div>

			<SubCategoryTable subCategories={subCategories} searchQuery={searchQuery} />
		</div>
	)
}

export default DashboardSubCategories
