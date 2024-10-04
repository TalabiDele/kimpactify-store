'use client'

import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Context from '/context/Context'
import { useSearchParams } from 'next/navigation'
import OrderItem from './OrderItem'
import OrderSummary from './OrderSummary'
import PayModal from './PayModal'
import PayForm from './PayForm'

const CheckoutProducts = () => {
	const [shippingDetails, setShippingDetails] = useState({
		name: '',
		email: '',
		number: null,
		address: '',
	})
	const [isPay, setIsPay] = useState(false)
	const [amount, setAmount] = useState()

	console.log(shippingDetails)
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
		} catch (error) {
			console.error('Failed to parse data', error)
		}
	}

	const handlePay = () => {
		setIsPay(true)
	}

	const calculateTotal = () => {
		return orders.reduce((acc, item) => {
			return acc + item.pricing * item.quantity
		}, 0)
	}

	return (
		<div>
			{isPay && (
				<PayForm
					isPay={isPay}
					setIsPay={setIsPay}
					items={orders}
					shippingDetails={shippingDetails}
					amount={calculateTotal()}
					products={orders}
				/>
			)}

			<div className=' flex justify-between gap-5'>
				<div className=''>
					{orders?.map((order) => (
						<OrderItem item={order} key={order?._id} />
					))}
				</div>

				<div className=' w-full'>
					<PayModal setShippingDetails={setShippingDetails} />

					<OrderSummary
						orders={orders}
						btnText={'Place order'}
						handleCheckout={handlePay}
					/>
				</div>
			</div>
		</div>
	)
}

export default CheckoutProducts
