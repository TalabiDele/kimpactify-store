'use client'

import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import moment from 'moment'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Confirmation = ({ order }) => {
	return (
		<motion.div 
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className='w-[90vw] max-w-2xl mx-auto my-[4rem] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden'
		>
			<div className='p-[3rem] text-center grid justify-items-center bg-gradient-to-b from-emerald-50/50 to-white'>
				<motion.div 
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
					className='text-emerald-500 text-6xl mb-[1.5rem]'
				>
					<FaCheckCircle />
				</motion.div>
				<h1 className='font-extrabold text-3xl text-slate-900 tracking-tight'>Payment Successful</h1>
				<p className='text-slate-500 mt-2 text-lg'>
					Your order of <span className='font-bold text-slate-900'>${order?.amount}</span> has been processed.
				</p>
			</div>

			<div className='px-[3rem] pb-[3rem]'>
				<h2 className='font-semibold text-sm text-slate-400 uppercase tracking-wider mb-4'>Order Details</h2>

				<div className='bg-slate-50 rounded-2xl p-[1.5rem] flex flex-col gap-4 border border-slate-100'>
					<div className='flex justify-between items-start max-sm:flex-col max-sm:gap-1'>
						<p className='text-sm text-slate-500 font-medium'>Transaction ID</p>
						<p className='font-mono text-sm font-semibold text-slate-900 bg-white px-2 py-1 rounded shadow-sm border border-slate-200'>
							{order?.transactionID}
						</p>
					</div>
					
					<div className='w-full h-px bg-slate-200/60'></div>

					<div className='flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-1'>
						<p className='text-sm text-slate-500 font-medium'>Date</p>
						<p className='font-semibold text-slate-900'>
							{moment(order?.createdAt).format('MMMM Do, YYYY')}
						</p>
					</div>

					<div className='w-full h-px bg-slate-200/60'></div>

					<div className='flex justify-between items-start max-sm:flex-col max-sm:gap-2'>
						<p className='text-sm text-slate-500 font-medium'>Products</p>
						<div className='flex flex-col gap-2 text-right max-sm:text-left'>
							{order?.products?.map((product) => (
								<div key={product?.id} className='flex items-center justify-end max-sm:justify-start gap-2'>
									<span className='font-semibold text-slate-900'>{product?.name}</span>
									<span className='text-slate-400 text-sm'>x{product?.quantity}</span>
									<span className='font-bold text-slate-700 ml-2'>${product?.price}</span>
								</div>
							))}
						</div>
					</div>

					<div className='w-full h-px bg-slate-200/60'></div>

					<div className='flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-1'>
						<p className='text-sm text-slate-500 font-medium'>Total Amount</p>
						<p className='font-extrabold text-xl text-emerald-600'>${order?.amount}</p>
					</div>
				</div>

				<div className='w-full mt-[2rem]'>
					<Link href={'/'}>
						<button className='w-full py-4 bg-slate-900 text-white rounded-full font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors'>
							Continue Shopping
						</button>
					</Link>
				</div>
			</div>
		</motion.div>
	)
}

export default Confirmation
