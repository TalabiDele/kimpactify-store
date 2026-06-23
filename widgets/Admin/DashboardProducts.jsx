'use client'

import React, { useContext, useState } from 'react'
import Heading from '/shared/ui/Heading'
import SearchInput from '/shared/ui/SearchInput'
import { BtnFill } from '/shared/ui/Buttons'
import { ProductTable } from '/shared/ui/Table'
import AddProduct from '/features/Admin/AddProduct'
import Context from '/shared/config/Context'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'

const DashboardProducts = () => {
	const [isAdd, setIsAdd] = useState(false)

	const { loading, setLoading, productItem, categories } = useContext(Context)

	return (
		<div className=''>
			{isAdd && <AddProduct categories={categories} setIsAdd={setIsAdd} />}
			<div className=''>
				{loading ? (
					<Skeleton className='h-4 w-[100px]' />
				) : (
					<Heading text={'Products'} />
				)}
			</div>
			<div className=' flex items-center justify-between mt-[4rem]'>
				{loading ? (
					<Skeleton className='h-4 w-[60px]' />
				) : (
					<SearchInput placeholder={'product'} />
				)}
				{loading ? (
					<Skeleton className='h-4 w-[60px]' />
				) : (
					<div className='' onClick={() => setIsAdd(true)}>
						<BtnFill text={'Add product'} />
					</div>
				)}
			</div>

			<ProductTable productItem={productItem} categories={categories} />
		</div>
	)
}

export default DashboardProducts
