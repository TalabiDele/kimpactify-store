'use client'

import React, { useContext } from 'react'
import { BtnPrimary, BtnSecondary } from './Buttons'
import { motion } from 'framer-motion'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'
import Context from '../context/Context'

const Banner = () => {
	const { loading } = useContext(Context)

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: false }}
		>
			{loading ? (
				<Skeleton className='h-[20rem] w-full mt-[0.5rem]' />
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: false }}
					className=' flex bg-[#ffd138] mt-[3rem] rounded-2xl p-[3rem]'
				>
					<div className=' w-[60%]'>
						<h1 className=' font-bold text-[3rem] leading-[1.2]'>
							Lorem Ipsum dolor, Lorem Ipsum dolor
						</h1>
						<p className=' text-sm my-[2rem]'>
							Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem
							ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum
							dolor,{' '}
						</p>
						<div className=' flex gap-[1rem]'>
							<BtnPrimary text={'Buy now'} />
							<BtnSecondary text={'Explore more'} />
						</div>
					</div>

					<div className=''></div>
				</motion.div>
			)}
		</motion.div>
	)
}

export default Banner
