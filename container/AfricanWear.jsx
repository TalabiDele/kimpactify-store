'use client'

import React, { useContext } from 'react'
import Card from '../components/Card'
import Heading from '../components/Heading'
import More from '../components/More'
import { motion } from 'framer-motion'
import Context from '../context/Context'
import CardSkeleton from '../components/CardSkeleton'

const AfricanWear = ({ africanWears }) => {
	const { loading } = useContext(Context)

	return (
		<div className=''>
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
				<div className=' flex flex-wrap items-center gap-[1rem] max-lg:justify-between max-xl:justify-start max-[460px]:mx-auto max-md:justify-center'>
					{loading ? (
						<div className='flex gap-[1rem] items-center flex-wrap'>
							<CardSkeleton />
							<CardSkeleton />
							<CardSkeleton />
							<CardSkeleton />
							<CardSkeleton />
						</div>
					) : (
						africanWears?.map(
							(african, index) =>
								index <= 5 - 1 && (
									<Card
										img={african?.image[0]}
										title={african?.title}
										description={african?.description}
										amount={`$${african?.pricing}`}
										rating={`[${african?.rating}]`}
										link={`/categories/${african?.category?.param}/${african?.subCategory?.param}/${african?._id}`}
										key={african?._id}
									/>
								)
						)
					)}
				</div>
			</motion.div>
		</div>
	)
}

export default AfricanWear
