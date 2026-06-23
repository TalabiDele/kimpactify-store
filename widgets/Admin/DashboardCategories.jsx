'use client'

import React, { useContext, useState } from 'react'
import Heading from '/shared/ui/Heading'
import SearchInput from '/shared/ui/SearchInput'
import { BtnFill } from '/shared/ui/Buttons'
import { CategoryTable } from '/widgets/Admin/CategoryTable'
import AddCategory from '/features/Admin/AddCategory'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'
import Context from '/shared/config/Context'

const DashboardCategories = () => {
	const [isAdd, setIsAdd] = useState(false)

	const { loading, categories } = useContext(Context)

	return (
		<div>
			{isAdd && <AddCategory setIsAdd={setIsAdd} />}
			<div className=''>
				{loading ? (
					<Skeleton className='h-4 w-[100px]' />
				) : (
					<Heading text={'Categories'} />
				)}
			</div>
			<div className=' flex items-center justify-between mt-[4rem]'>
				{loading ? (
					<Skeleton className='h-4 w-[100px]' />
				) : (
					<SearchInput placeholder={'product'} />
				)}
				{loading ? (
					<Skeleton className='h-4 w-[100px]' />
				) : (
					<div className='' onClick={() => setIsAdd(true)}>
						<BtnFill text={'Add category'} />
					</div>
				)}
			</div>

			<CategoryTable categories={categories} />
		</div>
	)
}

export default DashboardCategories
