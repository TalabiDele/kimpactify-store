'use client'

import React, { useContext, useState } from 'react'
import Heading from '/components/Heading'
import SearchInput from '/components/SearchInput'
import { BtnFill } from '/components/Buttons'
import { CategoryTable } from '../components/CategoryTable'
import AddCategory from '../components/AddCategory'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'
import Context from '/context/Context'

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
