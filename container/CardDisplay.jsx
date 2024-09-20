'use client'

import React, { useContext } from 'react'
import Card from '../components/Card'
import imgOne from '../assets/imgs/cloth-1.png'
import imgTwo from '../assets/imgs/cloth-2.png'
import Heading from '../components/Heading'
import More from '../components/More'
import { motion } from 'framer-motion'
import Context from '../context/Context'
import CardSkeleton from '../components/CardSkeleton'

const CardDisplay = ({ products, title, category }) => {
	const { loading } = useContext(Context)

	return (
		<motion.div
			initial={{ x: '-100%' }}
			whileInView={{ x: 0 }}
			viewport={{ once: true }}
			className=' mt-[3rem] w-[95vw] mx-auto'
		>
			<div className=' flex justify-between items-center mb-[2rem]'>
				<Heading text={title} />
				{/* <More link={`/categories/${}`} /> */}
			</div>
			<div className=' flex gap-[1rem] items-center flex-wrap'>
				{loading ? (
					<div className='flex gap-[1rem] items-center flex-wrap'>
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
					</div>
				) : (
					products?.map((product) => (
						<Card
							key={product?._id}
							img={product?.image[0]}
							title={product?.title}
							description={product?.description}
							amount={`$${product?.pricing}`}
							rating={`[${product?.rating}]`}
							link={`/categories/${product?.category?.param}/${product?.subCategory?.param}/${product?._id}`}
						/>
					))
				)}
			</div>
		</motion.div>
	)
}

export default CardDisplay
