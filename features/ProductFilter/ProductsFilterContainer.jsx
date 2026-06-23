'use client'

import React, { useState, useMemo, useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CardDisplay from '/widgets/ProductGrid/CardDisplay'
import { IoSearchOutline } from 'react-icons/io5'
import { FiFilter } from 'react-icons/fi'
import Context from '/shared/config/Context'
import Heading from '/shared/ui/Heading'

const ProductsFilterContainer = ({ initialProducts }) => {
	const searchParams = useSearchParams()
	
	// fallback to Context products if initialProducts isn't fully populated yet
	const { productItem } = useContext(Context)
	const products = initialProducts?.length > 0 ? initialProducts : (productItem || [])

	const [search, setSearch] = useState(searchParams?.get('search') || '')
	const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || 'All')
	const [selectedSize, setSelectedSize] = useState(searchParams?.get('size') || 'All')
	const [maxPrice, setMaxPrice] = useState(searchParams?.get('maxPrice') ? Number(searchParams?.get('maxPrice')) : 1000)
	const [sortOrder, setSortOrder] = useState('newest')
	const [showMobileFilters, setShowMobileFilters] = useState(false)

	// Extract unique categories
	const categories = useMemo(() => {
		const cats = new Set(products.map(p => p.category?.name).filter(Boolean))
		return ['All', ...Array.from(cats)]
	}, [products])

	// Extract unique sizes
	const sizes = useMemo(() => {
		const szs = new Set()
		products.forEach(p => {
			if (p.sizes) p.sizes.forEach(s => szs.add(s))
		})
		return ['All', ...Array.from(szs)]
	}, [products])

	// Find max price for the slider
	const absoluteMaxPrice = useMemo(() => {
		if (!products.length) return 1000
		return Math.ceil(Math.max(...products.map(p => Number(p.pricing) || 0)))
	}, [products])

	// Filter and Sort Logic
	const filteredProducts = useMemo(() => {
		let result = [...products]

		// Search
		if (search) {
			const q = search.toLowerCase()
			result = result.filter(p => 
				p.title?.toLowerCase().includes(q) || 
				p.description?.toLowerCase().includes(q)
			)
		}

		// Category
		if (selectedCategory !== 'All') {
			result = result.filter(p => p.category?.name === selectedCategory)
		}

		// Size
		if (selectedSize !== 'All') {
			result = result.filter(p => p.sizes?.includes(selectedSize))
		}

		// Price
		result = result.filter(p => (Number(p.pricing) || 0) <= maxPrice)

		// Sort
		if (sortOrder === 'price-low') {
			result.sort((a, b) => (Number(a.pricing) || 0) - (Number(b.pricing) || 0))
		} else if (sortOrder === 'price-high') {
			result.sort((a, b) => (Number(b.pricing) || 0) - (Number(a.pricing) || 0))
		} // default to newest (array order)

		return result
	}, [products, search, selectedCategory, selectedSize, maxPrice, sortOrder])

	return (
		<div className='w-[95vw] mx-auto mb-24'>
			{/* Top Bar: Title & Mobile Toggle */}
			<div className='flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-black pb-4 mb-12'>
				<h1 className='text-4xl font-extrabold uppercase tracking-tight text-black'>Collection</h1>
				
				<div className='flex items-center gap-6 w-full sm:w-auto'>
					{/* Sleek Search Bar */}
					<div className='relative w-full sm:w-[250px] group'>
						<input 
							type='text' 
							placeholder='SEARCH...' 
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className='w-full pb-2 bg-transparent border-b border-gray-300 text-xs font-semibold uppercase tracking-widest outline-none focus:border-black transition-colors placeholder:text-gray-400'
						/>
						<IoSearchOutline className='absolute right-0 top-0 text-gray-400 group-focus-within:text-black transition-colors' size={16} />
					</div>

					{/* Mobile Filter Toggle */}
					<button 
						onClick={() => setShowMobileFilters(!showMobileFilters)}
						className='lg:hidden text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-colors'
					>
						{showMobileFilters ? 'CLOSE' : 'FILTERS'}
					</button>
				</div>
			</div>

			<div className='flex flex-col lg:flex-row gap-16 relative items-start'>
				{/* Sidebar Filters - Sticky */}
				<div className={`lg:sticky lg:top-32 w-full lg:w-[220px] shrink-0 bg-white z-20 transition-all duration-300 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
					
					{/* Sort By */}
					<div className='mb-10'>
						<h3 className='font-bold text-black mb-4 uppercase tracking-widest text-[10px]'>Sort By</h3>
						<div className='relative'>
							<select 
								value={sortOrder} 
								onChange={(e) => setSortOrder(e.target.value)}
								className='w-full pb-2 bg-transparent border-b border-gray-200 text-xs font-medium outline-none focus:border-black cursor-pointer appearance-none'
							>
								<option value="newest">Newest Arrivals</option>
								<option value="price-low">Price: Low to High</option>
								<option value="price-high">Price: High to Low</option>
							</select>
							<div className='absolute right-0 top-1 pointer-events-none'>
								<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1 1L5 5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</div>
						</div>
					</div>

					{/* Categories */}
					<div className='mb-10'>
						<h3 className='font-bold text-black mb-4 uppercase tracking-widest text-[10px]'>Categories</h3>
						<div className='flex flex-col gap-3'>
							{categories.map(cat => (
								<button 
									key={cat} 
									onClick={() => setSelectedCategory(cat)}
									className={`text-left text-xs uppercase tracking-wider transition-colors ${selectedCategory === cat ? 'font-bold text-black' : 'text-gray-500 hover:text-black'}`}
								>
									{cat}
								</button>
							))}
						</div>
					</div>

					{/* Sizes */}
					<div className='mb-10'>
						<h3 className='font-bold text-black mb-4 uppercase tracking-widest text-[10px]'>Sizes</h3>
						<div className='flex flex-wrap gap-2'>
							{sizes.map(size => (
								<button 
									key={size}
									onClick={() => setSelectedSize(size)}
									className={`min-w-[40px] px-2 py-1.5 text-[11px] font-bold uppercase transition-all border ${selectedSize === size ? 'border-[#ffd138] bg-[#ffd138] text-slate-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#ffd138] hover:text-slate-900'}`}
								>
									{size}
								</button>
							))}
						</div>
					</div>

					{/* Price Range */}
					<div className='mb-10'>
						<h3 className='font-bold text-black mb-4 uppercase tracking-widest text-[10px] flex justify-between'>
							<span>Max Price</span>
							<span>${maxPrice}</span>
						</h3>
						<input 
							type='range' 
							min="0" 
							max={absoluteMaxPrice || 1000} 
							value={maxPrice} 
							onChange={(e) => setMaxPrice(Number(e.target.value))}
							className='w-full h-[1px] bg-gray-200 appearance-none outline-none accent-[#ffd138] cursor-pointer'
						/>
					</div>

					<button 
						onClick={() => {
							setSearch('')
							setSelectedCategory('All')
							setSelectedSize('All')
							setMaxPrice(absoluteMaxPrice || 1000)
							setSortOrder('newest')
						}}
						className='text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors underline underline-offset-4'
					>
						Clear Filters
					</button>

					{/* Mobile Close Button */}
					<button 
						onClick={() => setShowMobileFilters(false)}
						className='lg:hidden w-full mt-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-80'
					>
						Apply Filters
					</button>
				</div>

				{/* Product Grid */}
				<div className='flex-1'>
					{filteredProducts.length === 0 ? (
						<div className='flex flex-col items-center justify-center py-32 text-center border border-gray-100'>
							<h3 className='text-lg font-bold text-black uppercase tracking-widest mb-4'>No Results</h3>
							<p className='text-sm text-gray-500 max-w-sm mx-auto leading-relaxed'>Your search did not match any products. Please try modifying your filters.</p>
							<button 
								onClick={() => {
									setSearch('')
									setSelectedCategory('All')
									setSelectedSize('All')
									setMaxPrice(absoluteMaxPrice || 1000)
								}}
								className='mt-8 pb-1 border-b border-black text-xs font-bold uppercase tracking-widest hover:text-gray-500 transition-colors'
							>
								Clear Filters
							</button>
						</div>
					) : (
						<div>
							<div className='flex justify-between items-center mb-8 pb-4 border-b border-gray-100'>
								<span className='text-[10px] text-gray-500 font-bold uppercase tracking-widest'>
									{filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
								</span>
							</div>
							<CardDisplay products={filteredProducts} hideTitle={true} className='w-full mt-0' paginate={true} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductsFilterContainer
