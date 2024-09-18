'use client'

import React, { useState, useEffect, useContext } from 'react'
import DashboardProducts from '/container/DashboardProducts'
import { fetchAllProducts, fetchAllCategories } from '/utils/requests'
import Context from '/context/Context'

const ProductsPage = () => {
	const [productItem, setProductItem] = useState()
	const [categories, setCategories] = useState()

	const { loading, setLoading } = useContext(Context)

	useEffect(() => {
		setLoading(true)

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
