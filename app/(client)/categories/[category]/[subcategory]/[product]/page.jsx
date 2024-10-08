'use client'

import { useParams } from 'next/navigation'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import { fetchProduct } from '/utils/requests'
import ProductContainer from '/container/ProductContainer'
import Context from '/context/Context'
import ProductSkeleton from '/components/ProductSkeleton'

const Product = () => {
	const [productItem, setProductItem] = useState(null)

	const { setLoading, loading } = useContext(Context)

	const { product } = useParams()

	useEffect(() => {
		const fetchSingleProduct = async () => {
			setLoading(true)
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
		<Suspense fallback={<ProductSkeleton />}>
			{loading ? (
				<ProductSkeleton />
			) : (
				<div className=' mt-[5rem] w-[95vw] mx-auto'>
					<ProductContainer product={productItem && productItem[0]} />
				</div>
			)}
		</Suspense>
	)
}

export default Product
