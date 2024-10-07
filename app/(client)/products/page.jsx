'use client'

import React, { useContext, useEffect } from 'react'
import ProductsPage from '/container/ProductsPage'
import Context from '/context/Context'

const ProductPage = () => {
	const { fetchProducts } = useContext(Context)

	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<div>
			<ProductsPage />
		</div>
	)
}

export default ProductPage
