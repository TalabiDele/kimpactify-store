'use client'

import React, { useState } from 'react'
import Heading from '/components/Heading'
import SearchInput from '/components/SearchInput'
import { BtnFill } from '../components/Buttons'
import { ProductTable } from '/components/Table'
import EditProductModal from '../components/EditProductModal'
import AddProduct from '../components/AddProduct'

const DashboardProducts = ({ productItem, setProductItem, categories }) => {
	const [isAdd, setIsAdd] = useState(false)

	console.log(productItem)

	return (
		<div className=''>
			{isAdd && <AddProduct categories={categories} setIsAdd={setIsAdd} />}
			<div className=''>
				<Heading text={'Products'} />
			</div>
			<div className=' flex items-center justify-between mt-[4rem]'>
				<SearchInput placeholder={'product'} />
				<div className='' onClick={() => setIsAdd(true)}>
					<BtnFill text={'Add product'} />
				</div>
			</div>

			<ProductTable productItem={productItem} categories={categories} />
		</div>
	)
}

export default DashboardProducts
