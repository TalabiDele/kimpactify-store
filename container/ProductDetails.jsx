'use client'

import React, { useState } from 'react'
import Heading from '../components/Heading'
import { FaStar } from 'react-icons/fa'
import { BtnCard, BtnFill } from '../components/Buttons'
import { MdOutlineShoppingCart } from 'react-icons/md'

const ProductDetails = ({ product }) => {
	const [quantity, setQuantity] = useState(1)

	const handlePlus = () => {
		setQuantity(quantity + 1)
	}

	const handleMinus = () => {
		if (quantity !== 1) {
			setQuantity(quantity - 1)
		}
	}

	return (
		<div>
			<div className=''>
				<Heading text={product?.title} />
				<div className=' flex items-center mb-[1rem] mt-[0.5rem]'>
					<div className='flex items-center mr-[0.2rem]'>
						<FaStar color='#F7D977' fontSize={'0.7rem'} />
						<FaStar color='#F7D977' fontSize={'0.7rem'} />
						<FaStar color='#F7D977' fontSize={'0.7rem'} />
						<FaStar color='#F7D977' fontSize={'0.7rem'} />
						<FaStar color='#F7D977' fontSize={'0.7rem'} />
					</div>
					<p className=' text-[0.6rem]'>[{product?.rating}]</p>
				</div>
				<p className='font-bold text-3xl text-black mb-[0.3rem]'>
					${product?.pricing}
				</p>
				<p className=' text-[0.6rem] mt-[0.3rem] my-[0.5rem]'>
					{product?.description}
				</p>
				<div className=' flex items-center w-[5rem] justify-between'>
					<p
						className=' font-bold text-2xl cursor-pointer'
						onClick={handleMinus}
					>
						-
					</p>
					<input
						type='number'
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
						className=' w-[2rem] border border-[#E2E2E2] rounded-lg text-center remove-arrow'
					/>
					<p
						className=' font-bold text-2xl cursor-pointer'
						onClick={handlePlus}
					>
						+
					</p>
				</div>

				<div className=' flex gap-[1rem] mt-[1rem]'>
					<BtnFill text={'Buy now'} />
					<BtnCard text={'Add to cart'} icon={<MdOutlineShoppingCart />} />
				</div>
			</div>
		</div>
	)
}

export default ProductDetails