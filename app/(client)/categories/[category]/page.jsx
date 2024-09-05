'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchCategories, fetchTitle } from '/utils/requests'
import CardDisplay from '/container/CardDisplay'

const Category = () => {
	const [products, setProducts] = useState(null)
	const [loading, setLoading] = useState(true)
	const [title, setTitle] = useState('')

	const { category } = useParams()

	useEffect(() => {
		const fetchProducts = async () => {
			if (!category) return

			try {
				const productCategory = await fetchCategories(category)
				setProducts(productCategory)

				console.log(productCategory)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}

			// if(products === null) {

			// }
		}

		const fetchCategoryTitle = async () => {
			if (!category) return

			try {
				const categoryTitle = await fetchTitle(category)
				setTitle(categoryTitle[0]?.title)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
		fetchCategoryTitle()
	}, [category])

	// console.log('products', products)

	return (
		<div>
			<CardDisplay products={products} title={title} />
		</div>
	)
}

export default Category
