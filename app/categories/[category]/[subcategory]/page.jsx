'use client'

import { useParams } from 'next/navigation'
import {
	fetchSubCategoryTitle,
	fetchSubCategories,
} from '../../../../utils/requests'
import React, { useEffect, useState } from 'react'
import CardDisplay from '../../../../container/CardDisplay'

const SubCategory = () => {
	const [products, setProducts] = useState(null)
	const [title, setTitle] = useState('')
	const [loading, setLoading] = useState(true)

	const { subcategory } = useParams()

	// console.log(useParams)

	// console.log(subcategory)

	useEffect(() => {
		const fetchProducts = async () => {
			if (!subcategory) return

			console.log(subcategory)

			try {
				const productCategory = await fetchSubCategories(subcategory)
				setProducts(productCategory)

				console.log(products)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}

			// if(products === null) {

			// }
		}

		// fetchSubCategoryTitle(subcategory)

		const fetchSubTitle = async () => {
			if (!subcategory) return

			console.log(subcategory)

			try {
				const categoryTitle = await fetchSubCategoryTitle(subcategory)
				// setTitle(categoryTitle[0]?.title)
				console.log(categoryTitle)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
		fetchSubTitle()
	}, [subcategory])

	return (
		<div>
			<CardDisplay products={products} title={title} />
		</div>
	)
}

export default SubCategory
