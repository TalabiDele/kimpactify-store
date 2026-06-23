'use client'

import { useParams, useRouter } from 'next/navigation'
import { fetchSubCategories, fetchSubCategoryTitle } from '/shared/api/requests'
import React, { useContext, useEffect, useState, useMemo } from 'react'
import Card from '/shared/ui/Card'
import { EditorialSkeleton } from '/shared/ui/EditorialSkeleton'
import Context from '/shared/config/Context'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const SubCategory = () => {
	const [products, setProducts] = useState(null)
	const [title, setTitle] = useState(null)
	const [sortOrder, setSortOrder] = useState('newest')
	
	const { category, subcategory } = useParams()
	const { setLoading, loading } = useContext(Context)
	const router = useRouter()

	useEffect(() => {
		const loadData = async () => {
			if (!subcategory) return
			setLoading(true)
			try {
				const [productsRes, titleRes] = await Promise.all([
					fetchSubCategories(subcategory),
					fetchSubCategoryTitle(subcategory)
				])
				setProducts(productsRes)
				setTitle(titleRes[0])
			} catch (error) {
				console.error('Error fetching subcategory data', error)
			} finally {
				setLoading(false)
			}
		}
		loadData()
	}, [subcategory, setLoading])

	const sortedProducts = useMemo(() => {
		if (!products) return []
		const sorted = [...products]
		if (sortOrder === 'price-low') sorted.sort((a, b) => a.pricing - b.pricing)
		if (sortOrder === 'price-high') sorted.sort((a, b) => b.pricing - a.pricing)
		// newest is default, assuming products are fetched newest first
		return sorted
	}, [products, sortOrder])

	const featuredProduct = sortedProducts?.length > 0 ? [...sortedProducts].sort((a, b) => b.pricing - a.pricing)[0] : null
	const formatSlug = (slug) => slug?.replace(/-/g, ' ') || ''

	return (
		<div className="w-[95vw] mx-auto mb-24 mt-8">
			{/* Breadcrumb */}
			<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-8">
				<Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
				<span>/</span>
				<Link href={`/categories/${category}`} className="hover:text-slate-900 transition-colors">{formatSlug(category)}</Link>
				<span>/</span>
				<span className="text-slate-900">{title?.title || formatSlug(subcategory)}</span>
			</div>

			{loading ? (
				<EditorialSkeleton />
			) : (
				<>
					{/* Split-Hero Banner */}
					{sortedProducts?.length > 0 && (
						<motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
							className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
						>
							<div className="flex flex-col justify-center bg-slate-50 rounded-2xl p-12 lg:p-16 border border-slate-100">
								<h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight capitalize">
									{title?.title || formatSlug(subcategory)}
								</h1>
								<p className="text-slate-500 leading-relaxed max-w-md text-lg">
									Explore our exclusive collection of {title?.title || formatSlug(subcategory)}. Crafted with premium materials and stunning designs to elevate your wardrobe.
								</p>
								<div className="mt-12">
									<p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Featured Item</p>
									<h3 className="text-xl font-bold text-slate-900 mb-1 truncate">{featuredProduct?.title}</h3>
									<p className="text-slate-500 font-semibold">${featuredProduct?.pricing}</p>
								</div>
							</div>
							
							{featuredProduct?.image?.[0] && (
								<div className="relative h-[400px] lg:h-auto rounded-2xl overflow-hidden group border border-slate-100 shadow-sm">
									<Image 
										src={featuredProduct.image[0]}
										alt={featuredProduct.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										sizes="(max-width: 1024px) 100vw, 50vw"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
									<div className="absolute bottom-8 left-8 right-8">
										<button 
											onClick={() => router.push(`/categories/${category}/${subcategory}/${featuredProduct._id}`)}
											className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
										>
											Shop Featured
										</button>
									</div>
								</div>
							)}
						</motion.div>
					)}

					{/* Toolbar */}
					<div className="flex flex-col sm:flex-row justify-between items-center py-4 border-y border-slate-100 mb-10 sticky top-[90px] bg-white/80 backdrop-blur-md z-10">
						<div className="text-sm font-bold text-slate-500 mb-4 sm:mb-0">
							<span className="text-slate-900">{sortedProducts?.length || 0}</span> Items
						</div>
						
						<div className="flex items-center gap-4">
							<span className="text-xs font-bold uppercase tracking-widest text-slate-400">Sort By</span>
							<select 
								value={sortOrder}
								onChange={(e) => setSortOrder(e.target.value)}
								className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-slate-900 cursor-pointer text-slate-700"
							>
								<option value="newest">Newest Arrivals</option>
								<option value="price-low">Price: Low to High</option>
								<option value="price-high">Price: High to Low</option>
							</select>
						</div>
					</div>

					{/* Editorial Grid */}
					{sortedProducts?.length === 0 ? (
						<div className="text-center py-20 text-slate-500 bg-slate-50 rounded-2xl border border-slate-100">
							No products found in this category.
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{sortedProducts.map((product, index) => {
								const isFeatured = index === 0 || index === 1;
								return (
									<motion.div 
										key={product._id}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "-50px" }}
										transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
										className={isFeatured ? "md:col-span-2 lg:col-span-2" : ""}
									>
										<Card
											id={product._id}
											img={product.image[0]}
											title={product.title}
											description={product.description}
											amount={`$${product.pricing}`}
											rating={`[${product.rating || 0}]`}
											link={`/categories/${category}/${subcategory}/${product._id}`}
											fullWidth={isFeatured}
										/>
									</motion.div>
								)
							})}
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default SubCategory
