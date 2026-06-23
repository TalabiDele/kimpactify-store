'use client'

import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Context from '/shared/config/Context'
import { useSearchParams } from 'next/navigation'
import OrderItem from '/features/Checkout/OrderItem'
import OrderSummary from '/features/Checkout/OrderSummary'
import PayModal from './PayModal'
import PayForm from '/features/Checkout/PayForm'
import toast from 'react-hot-toast'
import Heading from '/shared/ui/Heading'

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
		<div className='w-full max-w-[1200px] mx-auto pb-12'>
			<Heading text='Checkout' />
			{isPay && (
				<PayForm
					setIsPay={setIsPay}
					items={orders}
					shippingDetails={shippingDetails}
					amount={calculateTotal()}
				/>
			)}

			<div className='flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8'>
				<div className='flex-1 flex flex-col gap-8'>
					<PayModal
						setShippingDetails={setShippingDetails}
						setIsSave={setIsSave}
					/>

					<div className='bg-white rounded-3xl p-8 border border-slate-200 shadow-sm'>
						<h2 className='text-2xl font-bold text-slate-900 mb-6'>Your Items</h2>
						<div className='flex flex-col gap-6'>
							{order?.map((order) => (
								<OrderItem
									item={order}
									order={order}
									setOrder={setOrder}
									key={order?._id}
								/>
							))}
						</div>
					</div>
				</div>

				<div className='w-full lg:w-[400px] shrink-0'>
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
