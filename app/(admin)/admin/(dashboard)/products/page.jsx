'use client'

import React, { useState, useEffect, useContext } from 'react'
import DashboardProducts from '/widgets/Admin/DashboardProducts'
import { fetchAllProducts, fetchAllCategories } from '/shared/api/requests'
import Context from '/shared/config/Context'

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
