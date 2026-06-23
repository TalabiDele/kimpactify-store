'use client'

import React, { useState } from 'react'
import { FaStar, FaMinus, FaPlus } from 'react-icons/fa6'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useCartStore } from '/shared/store/cartStore'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const ProductDetails = ({ product }) => {
	const [quantity, setQuantity] = useState(1)
	const [selectedSize, setSelectedSize] = useState(null)
	const [currentProduct, setCurrentProduct] = useState()

	const router = useRouter()
	const addItem = useCartStore((state) => state.addItem)

	const handlePlus = () => setQuantity(quantity + 1)
	const handleMinus = () => {
		if (quantity > 1) setQuantity(quantity - 1)
	}

	const handleCart = () => {
		if (!selectedSize) {
			toast.error('Please select a size first.', { duration: 4000 })
			return
		}
		addItem({ ...product, selectedSizes: [selectedSize], quantity })
		toast.success('Added to your cart elegantly.', { duration: 4000 })
	}

	const handleBuy = async () => {
		if (!selectedSize) {
			toast.error('Please select a size first.', { duration: 4000 })
			return
		}

		const orderItems = [{ ...product, selectedSizes: [selectedSize], quantity: 1 }]
		setCurrentProduct(orderItems)
		const serializedOrders = encodeURIComponent(JSON.stringify(orderItems))
		router.push(`/checkout?items=${serializedOrders}`)
	}

	const handleSize = (size) => {
		setSelectedSize(size)
	}

	return (
		<div className='w-full lg:w-[45%] lg:sticky lg:top-[100px] h-fit pr-4 max-md:px-4'>
			<motion.div 
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className='flex flex-col gap-10 pb-[4rem]'
			>
				{/* Title & Rating */}
				<div className='flex flex-col gap-4'>
					<h1 className='font-extrabold text-[3rem] leading-[1.1] text-slate-900 tracking-tight'>
						{product?.title}
					</h1>
					
					<div className='flex items-center gap-3'>
						<div className='flex items-center gap-1'>
							{[...Array(5)].map((_, i) => (
								<FaStar key={i} className="text-amber-400" fontSize={'1.1rem'} />
							))}
						</div>
						<span className='text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-md'>
							{product?.rating?.replace(/[\[\]]/g, '') || '5.0'} Reviews
						</span>
					</div>
				</div>

				{/* Price */}
				<div className='pb-10 border-b border-slate-100'>
					<p className='text-sm text-slate-500 font-semibold tracking-widest uppercase mb-2'>Price</p>
					<p className='font-bold text-5xl text-slate-900'>${product?.pricing}</p>
				</div>

				{/* Description */}
				<div className='flex flex-col gap-3'>
					<p className='text-sm text-slate-500 font-semibold tracking-widest uppercase'>Description</p>
					<p className='text-slate-600 leading-[1.8] font-light text-[1.1rem]'>
						{product?.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sapiente, similique velit nihil animi delectus sint alias magni obcaecati.'}
					</p>
				</div>

				{/* Sizes */}
				<div className='flex flex-col gap-4 mt-4'>
					<p className='text-sm text-slate-500 font-semibold tracking-widest uppercase'>Select Size</p>
					<div className='flex flex-wrap gap-3'>
						{product?.sizes?.map((size, index) => {
							const isSelected = selectedSize === size
							return (
								<button
									key={index}
									onClick={() => handleSize(size)}
									className={`min-w-[4.5rem] h-[3.5rem] px-6 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border 
										${isSelected 
											? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20 transform scale-105' 
											: 'border-slate-200 bg-white text-slate-600 hover:border-slate-900 hover:text-slate-900'
										}`}
								>
									{size}
								</button>
							)
						})}
					</div>
				</div>

				{/* Quantity & Actions */}
				<div className='flex flex-col gap-8 mt-6'>
					<div className='flex items-center gap-8'>
						<p className='text-sm text-slate-500 font-semibold tracking-widest uppercase'>Quantity</p>
						<div className='flex items-center bg-slate-50 border border-slate-200 rounded-full p-2'>
							<button onClick={handleMinus} className='w-12 h-12 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors'>
								<FaMinus size={14} />
							</button>
							<span className='w-14 text-center font-bold text-lg text-slate-900'>{quantity}</span>
							<button onClick={handlePlus} className='w-12 h-12 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors'>
								<FaPlus size={14} />
							</button>
						</div>
					</div>

					<div className='flex flex-col sm:flex-row gap-5 pt-8 border-t border-slate-100'>
						<button 
							onClick={handleCart}
							className='flex-1 py-5 flex items-center justify-center gap-3 bg-white border border-slate-900 text-slate-900 rounded-full font-bold text-lg hover:bg-slate-50 transition-colors'
						>
							<MdOutlineShoppingCart size={22} />
							Add to Bag
						</button>
						<button 
							onClick={handleBuy}
							className='flex-1 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-colors'
						>
							Buy Now
						</button>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default ProductDetails
