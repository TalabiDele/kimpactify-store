import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const Confirmation = ({ order }) => {
	console.log(order)

	return (
		<div className=' w-[60vw] mx-auto my-[2rem] rounded-md border p-[2rem]'>
			<div className=' text-center grid justify-items-center'>
				<div className=' text-green-600 text-7xl bg-green-100 p-[0.5rem] w-[6rem] h-[6rem] rounded-full flex items-center justify-center mb-[1rem]'>
					<FaCheckCircle />
				</div>
				<h1 className='font-semibold text-2xl'>Payment successful</h1>
				<p className='text-gray-400'>Successfully paid ${order?.amount}</p>
			</div>

			<h1 className=' my-[1rem] font-bold text-xl'>Payment methods</h1>

			<div className=' bg-gray-50 rounded-md p-[1rem]'>
				<div className='flex justify-between items-center'>
					<p className='text-gray-500'>Transaction ID</p>
					<p className=''>{order?.transactionID}</p>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-gray-500'>Products</p>
					{order?.products?.map((product) => (
						<p className='' key={product?.id}>
							{order?.transactionID}
						</p>
					))}
				</div>
			</div>
		</div>
	)
}

export default Confirmation
