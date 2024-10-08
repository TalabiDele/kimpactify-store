'use client'

import React, { Suspense, useContext, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchCategories, fetchTitle } from '/utils/requests'
import CardDisplay from '/container/CardDisplay'
import Context from '/context/Context'
import Banner from '/components/Banner'
import CardSkeleton from '/components/CardSkeleton'

const Category = () => {
	const [products, setProducts] = useState(null)
	const [title, setTitle] = useState('')
	const [banner, setBanner] = useState({
		heading: '',
		text: '',
	})

	const { setLoading, loading } = useContext(Context)

	const { category } = useParams()

	useEffect(() => {
		const fetchProducts = async () => {
			if (!category) return

			try {
				const productCategory = await fetchCategories(category)
				setProducts(productCategory)

				//(productCategory)
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

	// //('products', products)

	return (
		<Suspense
			fallback={
				<>
					<div className='flex gap-[1rem] items-center flex-wrap w-[95vw] mx-auto max-md:flex-col'>
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
					</div>
				</>
			}
		>
			<div className=' w-[95vw] mx-auto'>
				<Banner
					text={products && products[0]?.category?.text}
					heading={products && products[0]?.category?.heading}
				/>
				{loading ? (
					<div className='flex gap-[1rem] items-center flex-wrap w-[95vw] mx-auto max-md:flex-col'>
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
					</div>
				) : (
					<CardDisplay products={products} title={title} />
				)}
			</div>
		</Suspense>
	)
}

export default Category
