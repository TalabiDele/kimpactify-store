'use client'

import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { BtnStroke, BtnFill } from '../components/Buttons'
import { MdOutlineShoppingCart } from 'react-icons/md'
import Context from '../context/Context'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ProductDetails = ({ product }) => {
	const [quantity, setQuantity] = useState(1)
	const [sizes, setSizes] = useState([])
	const [currentProduct, setCurrentProduct] = useState()

	const router = useRouter()

	const { cart, setCart } = useContext(Context)

	useEffect(() => {}, [])

	const handlePlus = () => {
		setQuantity(quantity + 1)
	}

	const handleMinus = () => {
		if (quantity !== 1) {
			setQuantity(quantity - 1)
		}
	}

	const handleCart = () => {
		if (sizes.length === 0) {
			toast.error('Select size', {
				duration: 6000,
			})

			return
		}

		if (cart?.length === 0) {
			setCart((prevCart) => {
				return [...prevCart, { ...product, selectedSizes: sizes, quantity: 1 }]
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
						return prevCart.map((item, index) =>
							index === existingProductIndex
								? { ...item, quantity: (item.quantity || 1) + 1 }
								: item
						)
					} else {
						return [
							...prevCart,
							{ ...product, quantity: 1, selectedSizes: sizes },
						]
					}
				})

				toast.success('Item added to cart', {
					duration: 6000,
				})
			}
		}
	}

	const handleBuy = async () => {
		if (sizes.length === 0) {
			toast.error('Select size', {
				duration: 6000,
			})

			return
		}

		setCurrentProduct([{ ...product, selectedSizes: sizes, quantity: 1 }])

		if (currentProduct) {
			const serializedOrders = encodeURIComponent(
				JSON.stringify(currentProduct)
			)

			console.log(currentProduct)

			router.push(`/checkout?items=${serializedOrders}`)
		}
	}

	const handleSize = (size) => {
		const newSize = sizes?.filter((e) => e === size)

		console.log(newSize)

		if (newSize?.length === 0) {
			setSizes([...sizes, size])
		} else {
			const removeSize = sizes?.filter((e) => e !== size)
			setSizes(removeSize)
		}

		console.log(sizes)
	}

	return (
		<div>
			<div className=' w-[40vw] max-md:w-[90vw]'>
				<h1 className=' font-bold text-[3rem]'>{product?.title}</h1>
				<div className=' flex items-center mb-[1rem] mt-[0.5rem]'>
					<div className='flex items-center mr-[0.2rem]'>
						<FaStar color='#F7D977' fontSize={'1.2rem'} />
						<FaStar color='#F7D977' fontSize={'1.2rem'} />
						<FaStar color='#F7D977' fontSize={'1.2rem'} />
						<FaStar color='#F7D977' fontSize={'1.2rem'} />
						<FaStar color='#F7D977' fontSize={'1.2rem'} />
					</div>
					<p className=' text-[0.6rem]'>[{product?.rating}]</p>
				</div>
				<p
					className=' text-[0.7rem] text-[#727272] mb-[0rem] font-bold'
					style={{ color: '#727272' }}
				>
					Price
				</p>
				<p className='font-bold text-3xl text-black mb-[0.3rem]'>
					${product?.pricing}
				</p>
				<p
					className=' text-[0.7rem] text-[#727272] mb-[0rem] font-bold mt-[1rem]'
					style={{ color: '#727272' }}
				>
					Description
				</p>
				<p className=' text-[0.8rem] w-[70%]'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
					sapiente, similique velit nihil animi delectus sint alias magni
					obcaecati, saepe incidunt aliquid quis dignissimos. Consectetur
					laudantium modi odio repudiandae tempora.
				</p>
				<div className=''>
					<p
						className=' text-[0.7rem] text-[#727272] mb-[0.5rem] font-bold mt-[1rem]'
						style={{ color: '#727272' }}
					>
						Sizes
					</p>
					<div className=' flex gap-2'>
						{product?.sizes?.map((size, index) => (
							<p
								className={` ${
									sizes?.includes(size) && 'border border-blue-600 bg-blue-200'
								}
								rounded-md p-[0.3rem] text-sm text-blue-600 cursor-pointer`}
								key={index}
								onClick={() => handleSize(size)}
							>
								{size}
							</p>
						))}
					</div>
				</div>
				<p
					className=' text-[0.7rem] text-gray-200 mb-[0.3rem] font-bold mt-[1rem] '
					style={{ color: '#727272' }}
				>
					No. of items
				</p>
				<div className=' flex items-center w-[5rem] justify-between gap-2'>
					<p
						className=' font-bold text-3xl cursor-pointer'
						onClick={handleMinus}
					>
						-
					</p>
					<input
						type='number'
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
						className=' w-[4rem] h-[3rem] border border-[#E2E2E2] rounded-lg text-center remove-arrow'
					/>
					<p
						className=' font-bold text-3xl cursor-pointer'
						onClick={handlePlus}
					>
						+
					</p>
				</div>

				<div className=' flex gap-[1rem] mt-[1rem]'>
					<div className='' onClick={handleBuy}>
						<BtnFill text={'Buy now'} />
					</div>
					<div className='' onClick={handleCart}>
						<BtnStroke text={'Add to cart'} icon={<MdOutlineShoppingCart />} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails
