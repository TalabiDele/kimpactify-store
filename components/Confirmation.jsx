import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import moment from 'moment'

const Confirmation = ({ order }) => {
	console.log(order)

	return (
		<div className=' w-[60vw] mx-auto my-[2rem] rounded-md border p-[2rem]'>
			<div className=' text-center grid justify-items-center'>
				<div className=' text-green-600 text-7xl bg-green-100 p-[0.5rem] w-[6rem] h-[6rem] rounded-full flex items-center justify-center mb-[1rem]'>
					<FaCheckCircle />
				</div>
				<h1 className='font-semibold text-2xl'>Payment successful</h1>
				<p className='text-gray-400'>
					Successfully paid{' '}
					<span className=' font-semibold'>${order?.amount}</span>
				</p>
			</div>

			<h1 className=' my-[1rem] font-bold text-xl'>Payment methods</h1>

			<div className=' bg-gray-50 rounded-md p-[1rem]'>
				<div className='flex justify-between items-center mb-[1rem]'>
					<p className='text-gray-500'>Transaction ID</p>
					<p className=' font-semibold uppercase'>{order?.transactionID}</p>
				</div>
				<div className='flex justify-between items-center mb-[1rem]'>
					<p className='text-gray-500'>Date</p>
					<p className=' font-semibold'>
						{moment(order?.createdAt).format('MMMM Do YYYY')}
					</p>
				</div>
				<div className='flex justify-between items-center mb-[1rem]'>
					<p className='text-gray-500'>Products</p>
					<div className=''>
						{order?.products?.map((product) => (
							<p className=' font-semibold' key={product?.id}>
								{product?.name} <span>${product?.price}</span>{' '}
								<span className=' text-sm font-medium'>
									(x{product?.quantity})
								</span>
							</p>
						))}
					</div>
				</div>
				<div className='flex justify-between items-center mb-[1rem]'>
					<p className='text-gray-500'>Amount</p>
					<p className=' font-semibold'>${order?.amount}</p>
				</div>
			</div>
		</div>
	)
}

export default Confirmation
