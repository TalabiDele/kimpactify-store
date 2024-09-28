'use client'

import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Context from '/context/Context'
import { useSearchParams } from 'next/navigation'
import OrderItem from './OrderItem'
import OrderSummary from './OrderSummary'

const CheckoutProducts = () => {
	const itemsParams = useSearchParams()

	const items = itemsParams.get('items')

	const { setLoading } = useContext(Context)

	useEffect(() => {
		setLoading(false)
	}, [])

	let orders = []

	if (items) {
		try {
			orders = JSON.parse(decodeURIComponent(items))

			console.log(orders)
		} catch (error) {
			console.error('Failed to parse data', error)
		}
	}

	const handlePay = () => {
		console.log('pay')
	}

	return (
		<div>
			<div className=' flex justify-between'>
				{orders?.map((order) => (
					<OrderItem item={order} key={order?._id} />
				))}

				<OrderSummary
					orders={orders}
					btnText={'Place order'}
					handleCheckout={handlePay}
				/>
			</div>
		</div>
	)
}

export default CheckoutProducts
