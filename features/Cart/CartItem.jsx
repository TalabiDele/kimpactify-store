'use client'

import React, { useEffect, useState } from 'react'
import { useCartStore } from '/shared/store/cartStore'
import OrderSummary from '/features/Checkout/OrderSummary'
import OrderItem from '/features/Checkout/OrderItem'
import { useRouter } from 'next/navigation'

const CartItem = () => {
	const [orders, setOrders] = useState([])
	const [quantity, setQuantity] = useState(1)

	const cart = useCartStore((state) => state.items)

	const router = useRouter()

	//(cart)

	useEffect(() => {
		setOrders(cart)

		//(orders)
	}, [cart, orders])

	const serializedOrders = encodeURIComponent(JSON.stringify(orders))

	const handleChange = (e, id) => {
		// setOrders((prevItems) =>
		// 	prevItems.map((item) => item?._id === id && setQuantity(e.target.value))
		// )
		//(e.target.value)
	}

	const handleCheckout = () => {
		// setIsPay(true)

		router.push(`/checkout?items=${serializedOrders}`)
	}

	return (
		<div className='w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-[2rem] lg:gap-[4rem]'>
			<div className='flex-1 flex flex-col gap-[1.5rem]'>
				<h2 className='text-2xl font-extrabold text-slate-900 mb-2'>Your Items</h2>
				<div className='flex flex-col gap-6'>
					{cart?.map((item, index) => (
						<OrderItem item={item} key={item?._id} />
					))}
				</div>
			</div>

			<div className='w-full lg:w-[400px] shrink-0'>
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
