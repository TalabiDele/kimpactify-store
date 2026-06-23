'use client'

import React, { useMemo } from 'react'
import Card from '/shared/ui/Card'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

const TopPicks = ({ products }) => {
	const { category, subcategory } = useParams()

	const topProducts = useMemo(() => {
		if (!products || products.length === 0) return []
		// Sort by price descending to get top picks, take first 3
		const sorted = [...products].sort((a, b) => b.pricing - a.pricing)
		return sorted.slice(0, 3)
	}, [products])

	if (topProducts.length === 0) return null

	return (
		<motion.div 
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			className="w-full mb-2 bg-slate-50/50 p-6 lg:p-8 rounded-[2rem] border border-slate-100 shadow-sm"
		>
			<div className="flex items-center justify-between mb-8">
				<div>
					<h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Top Picks For You</h2>
					<p className="text-sm font-medium text-slate-500 mt-1">Curated selections just for you</p>
				</div>
				<div className="hidden sm:flex gap-1">
					<div className="w-2 h-2 rounded-full bg-[#ffd138]"></div>
					<div className="w-2 h-2 rounded-full bg-[#ffd138]/50"></div>
					<div className="w-2 h-2 rounded-full bg-[#ffd138]/30"></div>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{topProducts.map((product) => {
					// Extract URL parameters dynamically
					const prodCat = product.category?.param || 'all'
					const prodSubcat = product.subCategory?.param || 'all'
					
					return (
						<Card
							key={product._id}
							id={product._id}
							img={product.image[0]}
							title={product.title}
							description={product.description}
							amount={`$${product.pricing}`}
							rating={`[${product.rating || 0}]`}
							link={`/categories/${category || prodCat}/${subcategory || prodSubcat}/${product._id}`}
							fullWidth={true}
						/>
					)
				})}
			</div>
		</motion.div>
	)
}

export default TopPicks
