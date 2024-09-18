'use client'

import React, { useContext, useState } from 'react'
import Heading from '/components/Heading'
import SearchInput from '/components/SearchInput'
import { BtnFill } from '../components/Buttons'
import { ProductTable } from '/components/Table'
import AddProduct from '../components/AddProduct'
import Context from '/context/Context'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'

const DashboardProducts = ({ productItem, setProductItem, categories }) => {
	const [isAdd, setIsAdd] = useState(false)

	const { loading, setLoading } = useContext(Context)

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
