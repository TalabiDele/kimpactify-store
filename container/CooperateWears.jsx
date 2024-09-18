'use client'

import React from 'react'
import Heading from '../components/Heading'
import Card from '../components/Card'
import More from '../components/More'
import imgOne from '../assets/imgs/cloth-1.png'
import imgTwo from '../assets/imgs/cloth-2.png'
import { motion } from 'framer-motion'

const CooperateWears = ({ corporateWears }) => {
	return (
		<motion.div
			initial={{ x: 200 }}
			whileInView={{ x: 0 }}
			viewport={{ once: true }}
			className=' mt-[3rem]'
		>
			<div className=' flex justify-between items-center mb-[2rem]'>
				<Heading text={'Cooperate Wears'} />
				<More link={'/categories/cooperate-wears'} />
			</div>
			<div className=' grid grid-cols-5 justify-items-center gap-[1rem] items-center'>
				{corporateWears?.map((wear) => (
					<Card
						img={imgOne}
						title={wear?.title}
						description={wear?.description}
						amount={`$${wear?.pricing}`}
						rating={`[${wear?.rating}]`}
						link={`/categories/${wear?.category?.param}/${wear?.subCategory?.param}/${wear?._id}`}
						key={wear?._id}
					/>
				))}
			</div>
		</motion.div>
	)
}

export default CooperateWears
