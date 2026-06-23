'use client'

import React, { Suspense, useContext, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchCategories, fetchTitle } from '/shared/api/requests'
import CardDisplay from '/widgets/ProductGrid/CardDisplay'
import Context from '/shared/config/Context'
import { CategorySkeleton } from '/shared/ui/CategorySkeleton'
import Link from 'next/link'
import { motion } from 'framer-motion'
import HomeDiscoverCard from '/features/CategoryNavigation/HomeDiscoverCard'
import TopPicks from '/widgets/ProductShowcase/TopPicks'
import Banner from '/widgets/Banner/Banner'

const Category = () => {
	const [products, setProducts] = useState(null)
	const [title, setTitle] = useState('')

	const { setLoading, loading } = useContext(Context)

	const { category } = useParams()

	useEffect(() => {
		const fetchProducts = async () => {
			if (!category) return

			try {
				const productCategory = await fetchCategories(category)
				setProducts(productCategory)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
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
	}, [category, setLoading])

	const formatSlug = (slug) => slug?.replace(/-/g, ' ') || ''
	const headingText = products && products[0]?.category?.heading
	const descriptionText = products && products[0]?.category?.text

	return (
		<Suspense fallback={<CategorySkeleton />}>
			<div className='w-[95vw] mx-auto mb-24 mt-8'>
				{/* Breadcrumb */}
				<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-8">
					<Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
					<span>/</span>
					<span className="text-slate-900">{title || formatSlug(category)}</span>
				</div>

				<Banner
					text={products && products[0]?.category?.text}
					heading={products && products[0]?.category?.heading}
				/>

				<div className='mt-16 flex flex-col lg:flex-row gap-12 items-start relative'>
					<HomeDiscoverCard />
					
					<div className='flex-1 flex flex-col gap-12 overflow-hidden w-full'>
						{loading ? (
							<CategorySkeleton />
						) : (
							<>
								<TopPicks products={products} />
								<CardDisplay products={products} title={title} paginate={true} />
							</>
						)}
					</div>
				</div>
			</div>
		</Suspense>
	)
}

export default Category
