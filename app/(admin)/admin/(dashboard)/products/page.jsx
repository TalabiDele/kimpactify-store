'use client'

import React, { useState, useEffect } from 'react'
import DashboardProducts from '/container/DashboardProducts'
import { fetchAllProducts, fetchAllCategories } from '/utils/requests'

const ProductsPage = () => {
	const [loading, setLoading] = useState(false)
	const [productItem, setProductItem] = useState()
	const [categories, setCategories] = useState()

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const resProduct = await fetchAllProducts()

				console.log(resProduct)

				setProductItem(resProduct)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
		}

		const fetchCategories = async () => {
			try {
				const resCategories = await fetchAllCategories()

				console.log(resCategories)

				setCategories(resCategories)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
		}

		console.log(productItem)

		fetchProducts()
		fetchCategories()
	}, [])

	return (
		<div>
			<DashboardProducts
				productItem={productItem}
				setProductItem={setProductItem}
				categories={categories}
			/>
		</div>
	)
}

export default ProductsPage
