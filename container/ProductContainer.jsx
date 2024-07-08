'use client'

import React from 'react'
import ImageDisplay from '../components/ImageDisplay'
import ProductDetails from './ProductDetails'

const ProductContainer = ({ product }) => {
	console.log(product)

	return (
		<div className=''>
			<div className=' flex justify-between '>
				<ImageDisplay product={product} />
				<ProductDetails product={product} />
			</div>
		</div>
	)
}

export default ProductContainer
