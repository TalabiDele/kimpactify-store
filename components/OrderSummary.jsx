'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { BtnFill, BtnWide } from './Buttons'
import PayModal from './PayModal'
import { useRouter } from 'next/navigation'

const OrderSummary = ({ orders, btnText, handleCheckout }) => {
	const [amount, setAmount] = useState()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isPay, setIsPay] = useState(false)

	const router = useRouter()

	const calculateTotal = () => {
		return orders.reduce((acc, item) => {
			return acc + item.pricing * item.quantity
		}, 0)
	}

	return (
		<div>
			{/* <PayModal
				amount={amount}
				name={name}
				setName={setName}
				email={email}
				setEmail={setEmail}
				isPay={isPay}
				setIsPay={setIsPay}
			/> */}
			<div className='border rounded-md p-[1rem]'>
				<h1 className='text-xl font-bold mb-[1rem]'>Order Summary</h1>
				{orders?.length === 0 ? (
					<h1 className='text-center'>No item chosen</h1>
				) : (
					<div className=' border-b border-[#DFE2E6] pb-[1rem] text-[#5D6B82]'>
						{orders?.map((order, index) => (
							<div className=' flex justify-between  items-center '>
								<div className=''>
									<p className=' text-sm font-medium'>{order?.title}</p>
									<p className=' text-[0.7rem]'>x{order?.quantity}</p>
								</div>
								<p className=' font-bold'>
									${order?.quantity * order?.pricing}
								</p>
							</div>
						))}
					</div>
				)}
				<div className=' text-[#5D6B82] my-[1rem] flex justify-between items-center'>
					<p className='text-sm font-medium'>Subtotal</p>
					<p className=' font-bold'>${calculateTotal()}</p>
				</div>

				<div className=' w-full' onClick={handleCheckout}>
					<BtnWide text={btnText} />
				</div>
			</div>
		</div>
	)
}

export default OrderSummary
