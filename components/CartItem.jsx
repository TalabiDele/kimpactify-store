'use client'

import Context from '../context/Context'
import React, { useContext, useEffect, useState } from 'react'
import OrderSummary from './OrderSummary'
import OrderItem from './OrderItem'
import { useRouter } from 'next/navigation'

const CartItem = () => {
	const [orders, setOrders] = useState([])
	const [quantity, setQuantity] = useState(1)

	const { cart, setCart } = useContext(Context)

	const router = useRouter()

	useEffect(() => {
		setOrders(cart)

		console.log(orders)
	}, [cart, orders])

	const serializedOrders = encodeURIComponent(JSON.stringify(orders))

	const handleChange = (e, id) => {
		// setOrders((prevItems) =>
		// 	prevItems.map((item) => item?._id === id && setQuantity(e.target.value))
		// )

		console.log(e.target.value)
	}

	const handleCheckout = () => {
		// setIsPay(true)

		router.push(`/checkout?items=${serializedOrders}`)

		setAmount(calculateTotal())
	}

	return (
		<div className=' w-[90vw] flex justify-between gap-[1rem]'>
			<div className=''>
				{cart?.map((item, index) => (
					<OrderItem item={item} key={item?._id} />
				))}
			</div>

			<div className=' w-full'>
				<OrderSummary
					orders={cart}
					quantity={quantity}
					handleCheckout={handleCheckout}
					btnText={'Proceed to checkout'}
				/>
			</div>
		</div>
	)
}

export default CartItem
