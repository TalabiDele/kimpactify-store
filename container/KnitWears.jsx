'use client'

import React from 'react'
import imgOne from '../assets/imgs/cloth-1.png'
import imgTwo from '../assets/imgs/cloth-2.png'
import Heading from '../components/Heading'
import More from '../components/More'
import Card from '../components/Card'
import { motion } from 'framer-motion'

const KnitWears = ({ knitWear }) => {
	return (
		<motion.div
			initial={{ x: '-100%' }}
			whileInView={{ x: 0 }}
			viewport={{ once: true }}
			className=' mt-[3rem]'
		>
			<div className=' flex justify-between items-center mb-[2rem]'>
				<Heading text={'Knit Wears/Sweaters'} />
				<More link={'/categories/african-wears'} />
			</div>
			<div className=' flex flex-wrap gap-[1rem] items-center'>
				{knitWear?.map((wear) => (
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

export default KnitWears
