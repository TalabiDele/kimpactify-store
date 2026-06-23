'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IoSearchOutline } from 'react-icons/io5'

const HomeDiscoverCard = () => {
	const router = useRouter()
	const [search, setSearch] = useState('')
	const [category, setCategory] = useState('All')
	const [maxPrice, setMaxPrice] = useState(1000)

	const handleDiscover = (e) => {
		if (e) e.preventDefault()
		
		const params = new URLSearchParams()
		if (search.trim()) params.append('search', search.trim())
		if (category !== 'All') params.append('category', category)
		if (maxPrice < 1000) params.append('maxPrice', maxPrice)

		router.push(`/products?${params.toString()}`)
	}

	const handleQuickLink = (route) => {
		router.push(`/categories/${route}`)
	}

	return (
		<div className="bg-white lg:sticky lg:top-32 w-full lg:w-[300px] shrink-0 p-6 border border-slate-200 rounded-2xl shadow-sm flex flex-col gap-8">
			<div>
				<h2 className="text-xl font-bold text-slate-900 mb-1">Discover</h2>
				<p className="text-sm text-slate-500 leading-relaxed">Find exactly what you're looking for across our entire collection.</p>
			</div>

			<form onSubmit={handleDiscover} className="flex flex-col gap-6">
				{/* Search */}
				<div className="relative w-full group">
					<input 
						type="text" 
						placeholder="Search products..." 
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-slate-900 transition-colors placeholder:text-slate-400 text-slate-900"
					/>
					<button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors hover:scale-110">
						<IoSearchOutline size={20} />
					</button>
				</div>

				{/* Category */}
				<div>
					<h3 className="font-semibold text-slate-900 mb-2 text-sm">Category</h3>
					<div className="relative">
						<select 
							value={category} 
							onChange={(e) => setCategory(e.target.value)}
							className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-slate-900 cursor-pointer appearance-none text-slate-700"
						>
							<option value="All">All Categories</option>
							<option value="African Wears">African Wears</option>
							<option value="Corporate Wears">Corporate Wears</option>
							<option value="Knit Wears">Knit Wears</option>
							<option value="2 Piece Set">2 Piece Sets</option>
							<option value="Wrap Wears">Wrap Wears</option>
						</select>
						<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
							<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</div>
					</div>
				</div>

				{/* Price Range */}
				<div>
					<div className="flex justify-between items-center mb-2">
						<h3 className="font-semibold text-slate-900 text-sm">Max Price</h3>
						<span className="text-sm font-bold text-slate-900">${maxPrice}</span>
					</div>
					<input 
						type="range" 
						min="0" 
						max="1000" 
						value={maxPrice} 
						onChange={(e) => setMaxPrice(Number(e.target.value))}
						className="w-full accent-slate-900 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
					/>
				</div>

				<button 
					type="submit"
					className="mt-2 w-full py-3 bg-[#ffd138] text-slate-900 text-sm font-bold rounded-xl transition-all hover:bg-amber-400 hover:shadow-md active:scale-[0.98]"
				>
					Discover Collection
				</button>
			</form>

			<div className="pt-6 border-t border-slate-100">
				<h3 className="font-semibold text-slate-900 mb-3 text-sm">Quick Links</h3>
				<div className="flex flex-col gap-2">
					<button onClick={() => handleQuickLink('african-wears')} className="text-left text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors py-1">African Wears</button>
					<button onClick={() => handleQuickLink('corporate-wears')} className="text-left text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors py-1">Corporate Wears</button>
					<button onClick={() => handleQuickLink('knit-wears')} className="text-left text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors py-1">Knit Wears</button>
					<button onClick={() => handleQuickLink('two-piece-set')} className="text-left text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors py-1">2 Piece Sets</button>
					<button onClick={() => handleQuickLink('wrap-wears')} className="text-left text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors py-1">Wrap Wears</button>
				</div>
			</div>
		</div>
	)
}

export default HomeDiscoverCard
