'use client'

import React, { useContext } from 'react'
import Heading from '../components/Heading'
import Card from '../components/Card'
import More from '../components/More'
import imgOne from '../assets/imgs/cloth-1.png'
import imgTwo from '../assets/imgs/cloth-2.png'
import { motion } from 'framer-motion'
import Context from '../context/Context'
import CardSkeleton from '../components/CardSkeleton'

const CooperateWears = ({ corporateWears }) => {
	const { loading } = useContext(Context)

	return (
		<motion.div
			initial={{ x: 200 }}
			whileInView={{ x: 0 }}
			viewport={{ once: true }}
			className=' mt-[3rem]'
		>
			<div className=' flex justify-between items-center mb-[2rem]'>
				<Heading text={'Cooperate Wears'} />
				<More link={'/categories/corporate-wears'} />
			</div>
			<div className=' flex flex-wrap gap-[1rem] items-center'>
				{loading ? (
					<div className='flex gap-[1rem] items-center flex-wrap'>
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
					</div>
				) : (
					corporateWears?.map((wear) => (
						<Card
							img={imgOne}
							title={wear?.title}
							description={wear?.description}
							amount={`$${wear?.pricing}`}
							rating={`[${wear?.rating}]`}
							link={`/categories/${wear?.category?.param}/${wear?.subCategory?.param}/${wear?._id}`}
							key={wear?._id}
						/>
					))
				)}
			</div>
		</motion.div>
	)
}

export default CooperateWears
