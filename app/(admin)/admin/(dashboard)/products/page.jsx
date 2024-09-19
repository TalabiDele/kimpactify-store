'use client'

import React, { useState, useEffect, useContext } from 'react'
import DashboardProducts from '/container/DashboardProducts'
import { fetchAllProducts, fetchAllCategories } from '/utils/requests'
import Context from '/context/Context'

const ProductsPage = () => {
	const [productItem, setProductItem] = useState()
	const [categories, setCategories] = useState()

	const { fetchProducts, fetchCategories } = useContext(Context)

	useEffect(() => {
		// setLoading(true)
		fetchProducts()
		fetchCategories()
	}, [])

	return (
		<div>
			<DashboardProducts />
		</div>
	)
}

export default ProductsPage
