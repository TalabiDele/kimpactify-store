'use client'

import React, { useContext } from 'react'
import imgOne from '../assets/imgs/cloth-1.png'
import imgTwo from '../assets/imgs/cloth-2.png'
import Heading from '../components/Heading'
import More from '../components/More'
import Card from '../components/Card'
import { motion } from 'framer-motion'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'
import CardSkeleton from '../components/CardSkeleton'
import Context from '../context/Context'

const KnitWears = ({ knitWear }) => {
	const { loading } = useContext(Context)

	return (
		<motion.div
			initial={{ x: '-100%' }}
			whileInView={{ x: 0 }}
			viewport={{ once: true }}
			className=' mt-[3rem]'
		>
			<div className=' flex justify-between items-center mb-[2rem]'>
				<Heading text={'Knit Wears/Sweaters'} />
				<More link={'/categories/knit-wears'} />
			</div>
			<div className=' flex flex-wrap gap-[1rem] items-center max-lg:justify-between max-xl:justify-start max-[460px]:mx-auto max-md:justify-center'>
				{loading ? (
					<div className='flex gap-[1rem] items-center flex-wrap'>
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
					</div>
				) : (
					knitWear?.map(
						(wear, index) =>
							index <= 5 - 1 && (
								<Card
									img={wear?.image[0]}
									title={wear?.title}
									description={wear?.description}
									amount={`$${wear?.pricing}`}
									rating={`[${wear?.rating}]`}
									link={`/categories/${wear?.category?.param}/${wear?.subCategory?.param}/${wear?._id}`}
									key={wear?._id}
								/>
							)
					)
				)}
			</div>
		</motion.div>
	)
}

export default KnitWears
