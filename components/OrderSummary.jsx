import Image from 'next/image'
import React from 'react'

const OrderSummary = ({ orders, quantity }) => {
	// const uniqueItems = Array.from(
	// 	new Map(orders.map((item) => [item.id, item])).values()
	// )

	// console.log(orders, uniqueItems)

	return (
		<div>
			<div className=' w-[25vw] bg-[#fff] shadow-xl rounded-md p-[1rem]'>
				<h1 className='text-xl font-bold'>Order Summary</h1>
				{orders?.length === 0 ? (
					<h1 className='text-center'>No item chosen</h1>
				) : (
					orders?.map((order, index) => (
						// orders?.filter((item) => (
						<div className=' flex justify-between mt-[1rem] items-center text-[#5D6B82]'>
							<div className=''>
								<p className=' font-medium text-sm '>{order?.title}</p>
								<p className=' text-[0.7rem]'>x{order?.quantity}</p>
							</div>
							<p className=' font-bold'>${order?.quantity * order?.pricing}</p>
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default OrderSummary
