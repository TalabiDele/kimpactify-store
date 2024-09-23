'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchCategories, fetchTitle } from '/utils/requests'
import CardDisplay from '/container/CardDisplay'
import Context from '/context/Context'
import Banner from '/components/Banner'

const Category = () => {
	const [products, setProducts] = useState(null)
	const [title, setTitle] = useState('')
	const [banner, setBanner] = useState({
		heading: '',
		text: '',
	})

	const { setLoading } = useContext(Context)

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
		<div className=' w-[95vw] mx-auto'>
			<Banner
				text={products && products[0]?.category?.text}
				heading={products && products[0]?.category?.heading}
			/>
			<CardDisplay products={products} title={title} />
		</div>
	)
}

export default Category
