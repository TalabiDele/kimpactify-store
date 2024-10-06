'use client'

import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk'
import { submitPayment } from '/app/actions/actions'
import { IoMdClose } from 'react-icons/io'
import Heading from './Heading'
import toast from 'react-hot-toast'
import { useContext, useState } from 'react'
import Context from '/context/Context'
import Loader from './Loader'
import { useRouter } from 'next/navigation'

export default function PayForm({ setIsPay, shippingDetails, items, amount }) {
	let products

	const { isFetching, setIsFetching } = useContext(Context)

	const router = useRouter()

	const appId = process.env.NEXT_PUBLIC_APP_ID
	const locationId = process.env.NEXT_PUBLIC_LOCATION_ID

	console.log(items)

	const extractProducts = () => {
		const extracted = items.map((product) => ({
			name: product.title,
			price: product.pricing,
			quantity: product.quantity,
			sizes: product.selectedSizes,
		}))

		products = extracted

		console.log('selected', products)
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

			console.log(data)
		} catch (error) {
			console.log(error.message)
		} finally {
			setIsFetching(false)
		}
	}

	return (
		<>
			{isFetching && <Loader />}
			<div className=' fixed left-0 top-0 w-[100vw] h-[100vh] bg-white bg-opacity-75 z-10 flex items-center justify-center'>
				<div className=' w-[40rem] mx-auto bg-white p-[2rem] shadow-lg rounded-md'>
					<div className='flex justify-between mb-[2rem]'>
						<Heading text={'Make Payment'} />
						<IoMdClose
							fontSize={24}
							onClick={() => setIsPay(false)}
							className=' cursor-pointer'
						/>
					</div>
					<PaymentForm
						applicationId={appId}
						locationId={locationId}
						cardTokenizeResponseReceived={async (token) => {
							const result = await submitPayment(token.token, amount)
							handlePay(result)
							console.log(result)
						}}
					>
						<CreditCard />
					</PaymentForm>
				</div>
			</div>
		</>
	)
}
