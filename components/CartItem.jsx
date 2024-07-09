'use client'

import Image from 'next/image'
import Context from '../context/Context'
import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { BtnCard, BtnFill } from './Buttons'
import OrderSummary from './OrderSummary'

const CartItem = () => {
	const [orders, setOrders] = useState([])
	const [quantity, setQuantity] = useState(1)

	const { cart, setCart } = useContext(Context)

	useEffect(() => {
		setOrders(cart)

		console.log(orders)
	}, [cart, orders])

	console.log(cart)

	const uniqueItems = Array.from(
		new Map(cart?.map((item) => [item.id, item])).values()
	)

	const handleChange = (e, id) => {
		// setOrders((prevItems) =>
		// 	prevItems.map((item) => item?._id === id && setQuantity(e.target.value))
		// )

		console.log(e.target.value)
	}

	const handlePlus = (id, qty) => {
		console.log(id, qty)
		setCart((prevItems) =>
			prevItems.map((item) =>
				item._id === id ? { ...item, quantity: qty + 1 } : item
			)
		)
	}

	const handleMinus = (id, qty) => {
		if (qty !== 1) {
			setCart((prevItems) =>
				prevItems.map((item) =>
					item._id === id ? { ...item, quantity: qty - 1 } : item
				)
			)
		}
	}

	const handleRemove = (id) => {
		const filteredItems = items.filter((item) => item.id !== id)
		setItems(filteredItems)
	}

	return (
		<div className=' w-[90vw] flex justify-between'>
			<div className=''>
				{cart?.map((item, index) => (
					<div
						key={item?._id}
						className=' mt-[1rem] flex items-center w-[60vw] justify-between border-b border-[#DFE2E6] p-[1rem]'
					>
						<Image
							src={`/${item?.image[0]}`}
							width={100}
							height={150}
							objectFit='cover'
						/>

						<div className=' text-sm'>
							<p className=' font-bold'>{item?.title}</p>
							<p className=''>{item?.description}</p>
						</div>

						<div className=' flex items-center'>
							<div className='flex items-center mr-[0.2rem]'>
								<FaStar color='#F7D977' fontSize={'0.7rem'} />
								<FaStar color='#F7D977' fontSize={'0.7rem'} />
								<FaStar color='#F7D977' fontSize={'0.7rem'} />
								<FaStar color='#F7D977' fontSize={'0.7rem'} />
								<FaStar color='#F7D977' fontSize={'0.7rem'} />
							</div>
							<p className=' text-[0.6rem]'>[{item?.rating}]</p>
						</div>

						<div className=' font-bold text-[#1E65FF] text-2xl'>
							${item?.pricing}
						</div>

						<div className=' flex items-center w-[5rem] justify-between'>
							<p
								className=' font-bold text-2xl cursor-pointer'
								onClick={() =>
									handleMinus(item?._id, parseInt(item?.quantity, 10))
								}
							>
								-
							</p>
							<input
								type='number'
								value={item?.quantity}
								onChange={(e) => handleChange(e)}
								className=' w-[2rem] border border-[#E2E2E2] rounded-lg text-center remove-arrow'
							/>
							<p
								className=' font-bold text-2xl cursor-pointer'
								onClick={() =>
									handlePlus(item?._id, parseInt(item?.quantity, 10))
								}
							>
								+
							</p>
						</div>

						<div className=' flex gap-[1rem] items-center'>
							{/* <div className='' onClick={() => handleOrder(item)}>
							<BtnFill text={'Buy now'} />
						</div> */}
							<div className='' onClick={() => handleRemove(item)}>
								<BtnCard text={'Remove item'} />
							</div>
						</div>
					</div>
				))}
			</div>

			<OrderSummary orders={cart} quantity={quantity} />
		</div>
	)
}

export default CartItem
