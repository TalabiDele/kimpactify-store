'use client'

import React from 'react'
import Card from '../components/Card'
import imgOne from '../assets/imgs/cloth-1.png'
import imgTwo from '../assets/imgs/cloth-2.png'
import Heading from '../components/Heading'
import More from '../components/More'
import { motion } from 'framer-motion'

const AfricanWear = ({ africanWears }) => {
	return (
		<motion.div
			initial={{ x: '-100%' }}
			whileInView={{ x: 0 }}
			viewport={{ once: true }}
			className=' mt-[3rem]'
		>
			<div className=' flex justify-between items-center mb-[2rem]'>
				<Heading text={'African Wears'} />
				<More link={'/categories/african-wears'} />
			</div>
			<div className=' flex flex-wrap items-center gap-[1rem]'>
				{africanWears?.map(
					(african, index) =>
						index <= 5 - 1 && (
							<Card
								img={imgOne}
								title={african?.title}
								description={african?.description}
								amount={`$${african?.pricing}`}
								rating={`[${african?.rating}]`}
								link={`/categories/${african?.category?.param}/${african?.subCategory?.param}/${african?._id}`}
								key={african?._id}
							/>
						)
				)}
			</div>
		</motion.div>
	)
}

export default AfricanWear
