'use client'

import React, { useContext, useState, useEffect } from 'react'
import Card from '/shared/ui/Card'
import Heading from '/shared/ui/Heading'
import { motion, AnimatePresence } from 'framer-motion'
import Context from '/shared/config/Context'
import CardSkeleton from '/shared/ui/CardSkeleton'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0 },
	show: { 
		opacity: 1, 
		transition: { duration: 0.4, ease: "easeOut" } 
	},
}

const CardDisplay = ({ products, title, category, className, hideTitle, paginate = false, itemsPerPage = 20 }) => {
	const { loading } = useContext(Context)
	const [currentPage, setCurrentPage] = useState(1)

	// Reset page when products array changes (e.g. from filtering)
	useEffect(() => {
		setCurrentPage(1)
	}, [products])

	const displayProducts = paginate && products?.length > 0
		? products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
		: products

	const totalPages = paginate && products?.length > 0 
		? Math.ceil(products.length / itemsPerPage) 
		: 1

	const handlePrev = () => {
		if (currentPage > 1) {
			setCurrentPage(prev => prev - 1)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(prev => prev + 1)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	return (
		<div className={className || 'mt-[3rem] w-[95vw] mx-auto'}>
			{!hideTitle && (
				<div className='flex justify-between items-center mb-[2rem]'>
					<Heading text={title} />
				</div>
			)}
			
			<AnimatePresence mode='wait'>
				{loading ? (
					<motion.div
						key="loading"
						variants={containerVariants}
						initial="hidden"
						animate="show"
						exit={{ opacity: 0, transition: { duration: 0.2 } }}
						className='flex gap-[1rem] items-center flex-wrap max-lg:justify-between max-xl:justify-start max-[460px]:mx-auto max-md:justify-center'
					>
						{[...Array(5)].map((_, i) => (
							<motion.div key={i} variants={itemVariants}>
								<CardSkeleton />
							</motion.div>
						))}
					</motion.div>
				) : (
					<motion.div
						key="content"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='flex flex-col gap-8'
					>
						<div className='flex gap-[1rem] items-center flex-wrap max-lg:justify-between max-xl:justify-start max-[460px]:mx-auto max-md:justify-center'>
							{displayProducts?.map((product) => (
								<Card
									key={product?._id}
									img={product?.image[0]}
									title={product?.title}
									description={product?.description}
									amount={`$${product?.pricing}`}
									rating={`[${product?.rating}]`}
									link={`/categories/${product?.category?.param}/${product?.subCategory?.param}/${product?._id}`}
								/>
							))}
						</div>

						{/* Pagination Controls */}
						{paginate && totalPages > 1 && (
							<div className='flex items-center justify-center gap-4 mt-8 pb-12'>
								<button 
									onClick={handlePrev}
									disabled={currentPage === 1}
									className='flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
								>
									<FiChevronLeft size={20} />
								</button>
								
								<div className='flex items-center gap-2'>
									{[...Array(totalPages)].map((_, i) => (
										<button
											key={i}
											onClick={() => {
												setCurrentPage(i + 1)
												window.scrollTo({ top: 0, behavior: 'smooth' })
											}}
											className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
												currentPage === i + 1 
												? 'bg-slate-900 text-white' 
												: 'text-slate-600 hover:bg-slate-100'
											}`}
										>
											{i + 1}
										</button>
									))}
								</div>

								<button 
									onClick={handleNext}
									disabled={currentPage === totalPages}
									className='flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
								>
									<FiChevronRight size={20} />
								</button>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default CardDisplay
