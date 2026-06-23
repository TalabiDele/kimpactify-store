'use client'

import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk'
import { submitPayment } from '/app/actions/actions'
import { IoMdClose } from 'react-icons/io'
import Heading from '/shared/ui/Heading'
import toast from 'react-hot-toast'
import { useContext, useState } from 'react'
import Context from '/shared/config/Context'
import Loader from '/shared/ui/Loader'
import { useRouter } from 'next/navigation'

export default function PayForm({ setIsPay, shippingDetails, items, amount }) {
	let products

	const { isFetching, setIsFetching } = useContext(Context)

	const router = useRouter()

	const appId = process.env.NEXT_PUBLIC_APP_ID
	const locationId = process.env.NEXT_PUBLIC_LOCATION_ID

	//(items)

	const extractProducts = () => {
		const extracted = items.map((product) => ({
			name: product.title,
			price: product.pricing,
			quantity: product.quantity,
			sizes: product.selectedSizes,
		}))

		products = extracted

		//('selected', products)
	}

	const handlePay = async (result) => {
		setIsPay(false)
		setIsFetching(true)

		extractProducts()

		try {
			const response = await fetch(`/api/orders`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					shippingDetails,
					result,
					selectedProducts: products,
				}),
			})

			const data = await response.json()

			if (response.ok) {
				router.push(`/confirmation/${data._id}`)
				toast.success('Transaction completed', {
					duration: 6000,
				})
			}

			//(data)
		} catch (error) {
			//(error.message)
		} finally {
			setIsFetching(false)
		}
	}

	return (
		<>
			{isFetching && <Loader />}
			<div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4 transition-opacity'>
				<div className='w-full max-w-[500px] bg-white p-8 shadow-2xl rounded-3xl relative'>
					<div className='flex justify-between items-center mb-8 border-b border-slate-100 pb-4'>
						<Heading text={'Make Payment'} />
						<button 
							onClick={() => setIsPay(false)}
							className='w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 hover:text-black transition-colors'
						>
							<IoMdClose fontSize={24} />
						</button>
					</div>
					<div className='w-full'>
						<PaymentForm
							applicationId={appId}
							locationId={locationId}
							cardTokenizeResponseReceived={async (token) => {
								const result = await submitPayment(token.token, amount)
								handlePay(result)
							}}
						>
							<CreditCard />
						</PaymentForm>
					</div>
				</div>
			</div>
		</>
	)
}
