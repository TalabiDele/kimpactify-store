'use client'

import React from 'react'
import Card from '../components/Card'
import imgOne from '../assets/imgs/cloth-1.png'
import imgTwo from '../assets/imgs/cloth-2.png'
import Heading from '../components/Heading'
import More from '../components/More'
import { motion } from 'framer-motion'

const CardDisplay = ({ products, title }) => {
	// console.log(products)

	return (
		<motion.div
			initial={{ x: '-100%' }}
			whileInView={{ x: 0 }}
			viewport={{ once: true }}
			className=' mt-[3rem] w-[90vw] mx-auto'
		>
			<div className=' flex justify-between items-center mb-[2rem]'>
				<Heading text={title} />
				{/* <More link={`/categories/${}`} /> */}
			</div>
			<div className=' flex justify-between'>
				{products?.map((product) => (
					<Card
						img={imgOne}
						title={product?.title}
						description={product?.description}
						amount={`$${product?.pricing}`}
						rating={`[${product?.rating}]`}
					/>
				))}
			</div>
		</motion.div>
	)
}

export default CardDisplay
