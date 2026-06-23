'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

const CategoryNav = ({ isCategory, setIsCategory, setIsOpen }) => {
	const [activeCategory, setActiveCategory] = useState(null)

	const handleClose = () => {
		if (setIsOpen) setIsOpen(false)
		setIsCategory(false)
	}

	const toggleMobileCategory = (cat) => {
		setActiveCategory(activeCategory === cat ? null : cat)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			transition={{ duration: 0.2 }}
			className='bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden border border-gray-100 max-md:border-none max-md:shadow-none max-md:bg-transparent max-md:rounded-none'
			onMouseLeave={() => setIsCategory(false)}
		>
			<div className='grid grid-cols-5 p-8 gap-8 max-md:grid-cols-1 max-md:p-0 max-md:gap-0'>
				
				{/* African Wears */}
				<div className='flex flex-col max-md:border-b max-md:border-gray-100 max-md:py-3'>
					<div 
						className='flex items-center justify-between mb-4 max-md:mb-0 max-md:cursor-pointer group'
						onClick={() => toggleMobileCategory('african')}
					>
						<Link
							href={'/categories/african-wears'}
							className='font-semibold text-gray-900 group-hover:text-black transition-colors'
							onClick={handleClose}
						>
							African Wears
						</Link>
						<IoChevronDown className={`md:hidden transition-transform ${activeCategory === 'african' ? 'rotate-180' : ''}`} />
					</div>
					<div className={`flex flex-col gap-3 max-md:mt-3 max-md:pl-4 ${activeCategory === 'african' || 'max-md:hidden'}`}>
						{[
							{ name: 'African Sweaters', path: 'african-sweaters' },
							{ name: 'African Palazzo Pants', path: 'african-palazzo' },
							{ name: 'African Women Shorts', path: 'african-women-shorts' },
							{ name: 'African Men Shorts', path: 'african-Men-shorts' },
							{ name: 'Agbada Suit Set', path: 'agbada' },
							{ name: 'Ankara Blazers', path: 'ankara-blazers' },
							{ name: 'Ankara Joggers', path: 'ankara-joggers' },
							{ name: 'Ankara Tops', path: 'ankara-tops' },
							{ name: 'Maxi Dresses', path: 'maxi-dresses' },
							{ name: 'Nigerian Suit Style', path: 'senator' },
						].map((item) => (
							<Link
								key={item.path}
								href={`/categories/african-wears/${item.path}`}
								className='text-sm text-gray-500 hover:text-gray-900 transition-colors'
								onClick={handleClose}
							>
								{item.name}
							</Link>
						))}
					</div>
				</div>

				{/* Corporate Wears */}
				<div className='flex flex-col max-md:border-b max-md:border-gray-100 max-md:py-3'>
					<div 
						className='flex items-center justify-between mb-4 max-md:mb-0 max-md:cursor-pointer group'
						onClick={() => toggleMobileCategory('corporate')}
					>
						<Link
							href={'/categories/corporate-wears'}
							className='font-semibold text-gray-900 group-hover:text-black transition-colors'
							onClick={handleClose}
						>
							Corporate
						</Link>
						<IoChevronDown className={`md:hidden transition-transform ${activeCategory === 'corporate' ? 'rotate-180' : ''}`} />
					</div>
					<div className={`flex flex-col gap-3 max-md:mt-3 max-md:pl-4 ${activeCategory === 'corporate' || 'max-md:hidden'}`}>
						{[
							{ name: 'Pants', path: 'pants' },
							{ name: 'Tops', path: 'tops' },
						].map((item) => (
							<Link
								key={item.path}
								href={`/categories/corporate-wears/${item.path}`}
								className='text-sm text-gray-500 hover:text-gray-900 transition-colors'
								onClick={handleClose}
							>
								{item.name}
							</Link>
						))}
					</div>
				</div>

				{/* Knit Wears */}
				<div className='flex flex-col max-md:border-b max-md:border-gray-100 max-md:py-3'>
					<div 
						className='flex items-center justify-between mb-4 max-md:mb-0 max-md:cursor-pointer group'
						onClick={() => toggleMobileCategory('knit')}
					>
						<Link
							href={'/categories/knit-wears'}
							className='font-semibold text-gray-900 group-hover:text-black transition-colors'
							onClick={handleClose}
						>
							Knit Wears
						</Link>
						<IoChevronDown className={`md:hidden transition-transform ${activeCategory === 'knit' ? 'rotate-180' : ''}`} />
					</div>
					<div className={`flex flex-col gap-3 max-md:mt-3 max-md:pl-4 ${activeCategory === 'knit' || 'max-md:hidden'}`}>
						{[
							{ name: 'Hand Knitted', path: 'hand-knitted-wears' },
							{ name: 'Machine Knitted', path: 'machine-knitted-wears' },
						].map((item) => (
							<Link
								key={item.path}
								href={`/categories/knit-wears/${item.path}`}
								className='text-sm text-gray-500 hover:text-gray-900 transition-colors'
								onClick={handleClose}
							>
								{item.name}
							</Link>
						))}
					</div>
				</div>

				{/* 2 Piece Set */}
				<div className='flex flex-col max-md:border-b max-md:border-gray-100 max-md:py-3'>
					<div 
						className='flex items-center justify-between mb-4 max-md:mb-0 max-md:cursor-pointer group'
						onClick={() => toggleMobileCategory('piece')}
					>
						<Link
							href={'/categories/two-piece-set'}
							className='font-semibold text-gray-900 group-hover:text-black transition-colors'
							onClick={handleClose}
						>
							2 Piece Sets
						</Link>
						<IoChevronDown className={`md:hidden transition-transform ${activeCategory === 'piece' ? 'rotate-180' : ''}`} />
					</div>
					<div className={`flex flex-col gap-3 max-md:mt-3 max-md:pl-4 ${activeCategory === 'piece' || 'max-md:hidden'}`}>
						{[
							{ name: 'Bubu Plain & Ankara', path: 'bubu-plain-ankara' },
							{ name: 'Crop Tops', path: 'crop-tops' },
						].map((item) => (
							<Link
								key={item.path}
								href={`/categories/two-piece-set/${item.path}`}
								className='text-sm text-gray-500 hover:text-gray-900 transition-colors'
								onClick={handleClose}
							>
								{item.name}
							</Link>
						))}
					</div>
				</div>

				{/* Wrap Wears */}
				<div className='flex flex-col max-md:border-b max-md:border-gray-100 max-md:py-3'>
					<div 
						className='flex items-center justify-between mb-4 max-md:mb-0 max-md:cursor-pointer group'
						onClick={() => toggleMobileCategory('wrap')}
					>
						<Link
							href={'/categories/wrap-wears'}
							className='font-semibold text-gray-900 group-hover:text-black transition-colors'
							onClick={handleClose}
						>
							Wrap Wears
						</Link>
						<IoChevronDown className={`md:hidden transition-transform ${activeCategory === 'wrap' ? 'rotate-180' : ''}`} />
					</div>
					<div className={`flex flex-col gap-3 max-md:mt-3 max-md:pl-4 ${activeCategory === 'wrap' || 'max-md:hidden'}`}>
						{[
							{ name: 'Wrap Tops', path: 'wrap-tops' },
							{ name: 'Wrap Skirts', path: 'wrap-skirts' },
							{ name: 'Wrap Gowns', path: 'wrap-gowns' },
							{ name: 'Corset Tops/Blouses', path: 'corset-tops' },
						].map((item) => (
							<Link
								key={item.path}
								href={`/categories/wrap-wears/${item.path}`}
								className='text-sm text-gray-500 hover:text-gray-900 transition-colors'
								onClick={handleClose}
							>
								{item.name}
							</Link>
						))}
					</div>
				</div>

			</div>
		</motion.div>
	)
}

export default CategoryNav
