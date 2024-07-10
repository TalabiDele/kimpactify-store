import Image from 'next/image'
import React from 'react'
import { BtnFill, BtnWide } from './Buttons'

const OrderSummary = ({ orders, quantity }) => {
	// const uniqueItems = Array.from(
	// 	new Map(orders.map((item) => [item.id, item])).values()
	// )

	// console.log(orders, uniqueItems)

	const calculateTotal = () => {
		return orders.reduce((acc, item) => {
			return acc + item.pricing * item.quantity
		}, 0)
	}

	return (
		<div>
			<div className=' w-[25vw] bg-[#fff] shadow-xl rounded-md p-[1rem]'>
				<h1 className='text-xl font-bold mb-[1rem]'>Order Summary</h1>
				{orders?.length === 0 ? (
					<h1 className='text-center'>No item chosen</h1>
				) : (
					<div className=' border-b border-[#DFE2E6] pb-[1rem] text-[#5D6B82]'>
						{orders?.map((order, index) => (
							// orders?.filter((item) => (
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

				<div className=' w-full'>
					<BtnWide text={'Checkout'} />
				</div>
			</div>
		</div>
	)
}

export default OrderSummary
