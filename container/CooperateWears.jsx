'use client'

import React from 'react'
import Heading from '../components/Heading'
import Card from '../components/Card'
import More from '../components/More'
import imgOne from '../assets/imgs/cloth-1.png'
import imgTwo from '../assets/imgs/cloth-2.png'
import { motion } from 'framer-motion'

const CooperateWears = () => {
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
			<div className=' flex justify-between'>
				<Card
					img={imgOne}
					title={'Canon Camera'}
					description={"Capturing Life's Precious Moments."}
					amount={'$199.99'}
					rating={'[4.5]'}
					link={'/'}
				/>
				<Card
					img={imgTwo}
					title={'Sony Headphones'}
					description={"Capturing Life's Precious Moments."}
					amount={'$199.99'}
					rating={'[4.5]'}
					link={'/'}
				/>
				<Card
					img={imgOne}
					title={'Canon Camera'}
					description={"Capturing Life's Precious Moments."}
					amount={'$199.99'}
					rating={'[4.5]'}
					link={'/'}
				/>
				<Card
					img={imgTwo}
					title={'Sony Headphones'}
					description={"Capturing Life's Precious Moments."}
					amount={'$199.99'}
					rating={'[4.5]'}
					link={'/'}
				/>
				<Card
					img={imgTwo}
					title={'Sony Headphones'}
					description={"Capturing Life's Precious Moments."}
					amount={'$199.99'}
					rating={'[4.5]'}
					link={'/'}
				/>
			</div>
		</motion.div>
	)
}

export default CooperateWears
