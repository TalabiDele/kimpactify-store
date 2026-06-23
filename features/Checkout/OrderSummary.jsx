'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { BtnFill, BtnWide } from '/shared/ui/Buttons'
import PayModal from '/features/Cart/PayModal'
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
		<div className='bg-slate-50 rounded-3xl p-8 border border-slate-200 sticky top-32 shadow-sm'>
			<h2 className='text-2xl font-extrabold text-slate-900 mb-6'>Order Summary</h2>
			{orders?.length === 0 ? (
				<p className='text-slate-500 text-center py-4'>No item chosen</p>
			) : (
				<div className='space-y-4 mb-6 pb-6 border-b border-slate-200'>
					{orders?.map((order, index) => (
						<div className='flex justify-between items-start' key={index}>
							<div className='flex-1 pr-4'>
								<p className='text-sm font-bold text-slate-800'>{order?.title}</p>
								<p className='text-xs font-medium text-slate-500 mt-1'>Qty: {order?.quantity}</p>
							</div>
							<p className='font-bold text-slate-900'>
								${(order?.quantity * order?.pricing).toFixed(2)}
							</p>
						</div>
					))}
				</div>
			)}
			<div className='flex justify-between items-center mb-8'>
				<p className='text-lg font-semibold text-slate-600'>Subtotal</p>
				<p className='text-3xl font-extrabold text-slate-900'>${calculateTotal().toFixed(2)}</p>
			</div>

			<button 
				className='w-full bg-slate-900 text-white font-bold py-4 rounded-full shadow-lg hover:bg-slate-800 hover:scale-[1.02] transition-all duration-300'
				onClick={handleCheckout}
			>
				{btnText}
			</button>
		</div>
	)
}

export default OrderSummary
