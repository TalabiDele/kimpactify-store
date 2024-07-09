'use client'

import React, { useContext, useState } from 'react'
import Heading from '../components/Heading'
import { FaStar } from 'react-icons/fa'
import { BtnCard, BtnFill } from '../components/Buttons'
import { MdOutlineShoppingCart } from 'react-icons/md'
import Context from '../context/Context'
import toast from 'react-hot-toast'

const ProductDetails = ({ product }) => {
	const [quantity, setQuantity] = useState(1)

	const { cart, setCart } = useContext(Context)

	console.log('cart', cart, product)

	const handlePlus = () => {
		setQuantity(quantity + 1)
	}

	const handleMinus = () => {
		if (quantity !== 1) {
			setQuantity(quantity - 1)
		}
	}

	const handleCart = () => {
		if (cart?.length === 0) {
			setCart((prevCart) => {
				return [...prevCart, { ...product, quantity: 1 }]
			})

			toast.success('Item added to cart', {
				duration: 6000,
			})
		} else {
			const itemId = cart?.find((item) => item?._id === product?._id)

			if (itemId) {
				toast.error('Item already in cart', {
					duration: 6000,
				})
			} else {
				setCart((prevCart) => {
					const existingProductIndex = prevCart.findIndex(
						(item) => item._id === product._id
					)

					console.log(prevCart)

					if (existingProductIndex !== -1) {
						// Product already in cart, update the quantity
						return prevCart.map((item, index) =>
							index === existingProductIndex
								? { ...item, quantity: (item.quantity || 1) + 1 }
								: item
						)
					} else {
						return [...prevCart, { ...product, quantity: 1 }]
					}
				})

				toast.success('Item added to cart', {
					duration: 6000,
				})
			}
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
					<div className='' onClick={handleCart}>
						<BtnCard text={'Add to cart'} icon={<MdOutlineShoppingCart />} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails
