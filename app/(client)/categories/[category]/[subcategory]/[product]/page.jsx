'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { fetchProduct } from '/utils/requests'
import ProductContainer from '/container/ProductContainer'

const Product = () => {
	const [productItem, setProductItem] = useState(null)
	const [loading, setLoading] = useState(true)

	const { product } = useParams()

	useEffect(() => {
		const fetchSingleProduct = async () => {
			try {
				const resProduct = await fetchProduct(product)

				setProductItem(resProduct)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
		}

		fetchSingleProduct()
	}, [product])

	return (
		<div className=' mt-[5rem] w-[50vw] mx-auto'>
			<ProductContainer product={productItem && productItem[0]} />
		</div>
	)
}

export default Product
