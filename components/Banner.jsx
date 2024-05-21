'use client'

import React from 'react'
import { BtnPrimary, BtnSecondary } from './Buttons'
import { motion } from 'framer-motion'

const Banner = () => {
	return (
		<motion.div
			initial={{ x: 200 }}
			whileInView={{ x: 0 }}
			viewport={{ once: false }}
			className=' flex bg-[#F7D977] mt-[3rem] rounded-2xl p-[3rem]'
		>
			<div className=' w-[60%]'>
				<h1 className=' font-bold text-[3rem] leading-[1.2]'>
					Lorem Ipsum dolor, Lorem Ipsum dolor
				</h1>
				<p className=' text-sm my-[2rem]'>
					Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum
					dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor,{' '}
				</p>
				<div className=' flex gap-[1rem]'>
					<BtnPrimary text={'Buy now'} />
					<BtnSecondary text={'Explore more'} />
				</div>
			</div>

			<div className=''></div>
		</motion.div>
	)
}

export default Banner
