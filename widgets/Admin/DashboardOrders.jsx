'use client'

import React, { useState } from 'react'
import Heading from '/shared/ui/Heading'
import SearchInput from '/shared/ui/SearchInput'
import { OrderTable } from '/widgets/Admin/OrderTable'

const DashboardOrders = ({ orders }) => {
	const [searchQuery, setSearchQuery] = useState('')

	return (
		<div>
			<div className='mt-4'>
				<Heading text={'Orders Dashboard'} />
			</div>
			
			<div className='flex flex-col sm:flex-row items-center justify-between mt-10 mb-6 gap-4 bg-white p-4 rounded-2xl border border-slate-200'>
				<div className="w-full sm:w-1/2 md:w-1/3">
					<SearchInput placeholder={'Search customer name or email...'} value={searchQuery} onChange={setSearchQuery} />
				</div>
			</div>

			<OrderTable orders={orders} searchQuery={searchQuery} />
		</div>
	)
}

export default DashboardOrders
