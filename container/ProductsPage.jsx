'use client'

import CardDisplay from './CardDisplay'
import Context from '/context/Context'
import React, { useContext } from 'react'

const ProductsPage = () => {
	const { productItem } = useContext(Context)

	return (
		<div>
			<div className=''>
				<CardDisplay products={productItem} title={'Products'} />
			</div>
		</div>
	)
}

export default ProductsPage
