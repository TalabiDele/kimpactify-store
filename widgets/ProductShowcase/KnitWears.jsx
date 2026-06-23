'use client'

import React, { useContext } from 'react'
import imgOne from '/assets/imgs/cloth-1.png'
import imgTwo from '/assets/imgs/cloth-2.png'
import Heading from '/shared/ui/Heading'
import More from '/shared/ui/More'
import Card from '/shared/ui/Card'
import { motion } from 'framer-motion'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'
import CardSkeleton from '/shared/ui/CardSkeleton'
import Context from '/shared/config/Context'

const KnitWears = ({ knitWear }) => {
	const { loading } = useContext(Context)

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: 'easeOut' }}
			className=' mt-[3rem]'
		>
			<div className=' flex justify-between items-center mb-[2rem]'>
				<Heading text={'Knit Wears/Sweaters'} />
				<More link={'/categories/knit-wears'} />
			</div>
			<div className=' flex flex-wrap gap-[1rem] items-center max-lg:justify-between max-xl:justify-start max-[460px]:mx-auto'>
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
