'use client'

import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Context from '/context/Context'
import { useSearchParams } from 'next/navigation'
import OrderItem from './OrderItem'
import OrderSummary from './OrderSummary'
import PayModal from './PayModal'
import PayForm from './PayForm'
import toast from 'react-hot-toast'

const CheckoutProducts = () => {
	const [shippingDetails, setShippingDetails] = useState({
		name: '',
		email: '',
		number: null,
		address: '',
	})
	const [isPay, setIsPay] = useState(false)
	const [amount, setAmount] = useState()
	const [order, setOrder] = useState([])
	const [isSave, setIsSave] = useState(false)

	//(shippingDetails)
	const itemsParams = useSearchParams()
	const items = itemsParams.get('items')
	const { setLoading } = useContext(Context)

	let orders = []

	if (items) {
		try {
			orders = JSON.parse(decodeURIComponent(items))
			// setOrder(orders)
		} catch (error) {
			console.error('Failed to parse data', error)
		}
	}

	useEffect(() => {
		setLoading(false)

		setOrder(orders)
	}, [])

	const handlePay = () => {
		if (!isSave) {
			toast.error('Please complete & save shipping details', {
				duration: 6000,
			})
			return
		}

		//(shippingDetails)

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
					{order?.map((order) => (
						<OrderItem
							item={order}
							order={order}
							setOrder={setOrder}
							key={order?._id}
						/>
					))}
				</div>

				<div className=' w-full'>
					<PayModal
						setShippingDetails={setShippingDetails}
						setIsSave={setIsSave}
					/>

					<OrderSummary
						orders={order}
						btnText={'Place order'}
						handleCheckout={handlePay}
					/>
				</div>
			</div>
		</div>
	)
}

export default CheckoutProducts
