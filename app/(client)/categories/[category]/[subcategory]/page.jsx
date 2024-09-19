'use client'

import { useParams } from 'next/navigation'
import {
	fetchCategoryTitle,
	fetchSubCategories,
	fetchSubCategoryTitle,
} from '/utils/requests'
import React, { useContext, useEffect, useState } from 'react'
import CardDisplay from '/container/CardDisplay'
import Context from '/context/Context'

const SubCategory = () => {
	const [products, setProducts] = useState(null)
	const [title, setTitle] = useState('')
	const [category, setCategory] = useState(null)

	const { subcategory } = useParams()

	const { setLoading } = useContext(Context)

	useEffect(() => {
		const fetchProducts = async () => {
			if (!subcategory) return

			try {
				const productCategory = await fetchSubCategories(subcategory)
				setProducts(productCategory)

				console.log(productCategory)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
		}

		const fetchSubTitle = async () => {
			if (!subcategory) return

			try {
				const categoryTitle = await fetchSubCategoryTitle(subcategory)
				setTitle(categoryTitle[0])
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
		}

		const fetchTitle = async () => {
			// if (!products) return

			try {
				const productCategory = await fetchSubCategories(subcategory)

				console.log('product category', productCategory)

				if (productCategory) {
					console.log(productCategory[0]?._id)
					const categoryTitle = await fetchCategoryTitle(
						productCategory[0]?._id
					)
					setCategory(categoryTitle[0])

					console.log(categoryTitle)
				}
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
		fetchSubTitle()
		fetchTitle()
	}, [subcategory])

	return (
		<div>
			<CardDisplay
				products={products}
				title={title?.title}
				category={category}
			/>
		</div>
	)
}

export default SubCategory
