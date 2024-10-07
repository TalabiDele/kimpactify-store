'use client'

import React from 'react'
import ImageDisplay from '../components/ImageDisplay'
import ProductDetails from './ProductDetails'

const ProductContainer = ({ product }) => {
	//(product)

	return (
		<div className=''>
			<div className=' flex justify-between gap-[1rem] w-full max-md:flex-col'>
				<ImageDisplay product={product} />
				<ProductDetails product={product} />
			</div>
		</div>
	)
}

export default ProductContainer
