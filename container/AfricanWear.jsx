'use client'

import React from 'react'
import Card from '../components/Card'
import imgOne from '../assets/imgs/cloth-1.png'
import imgTwo from '../assets/imgs/cloth-2.png'
import Heading from '../components/Heading'
import More from '../components/More'
import { motion } from 'framer-motion'

const AfricanWear = () => {
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
			<div className=' flex justify-between'>
				<Card
					img={imgOne}
					title={'Canon Camera'}
					description={"Capturing Life's Precious Moments."}
					amount={'$199.99'}
					rating={'[4.5]'}
				/>
				<Card
					img={imgTwo}
					title={'Sony Headphones'}
					description={"Capturing Life's Precious Moments."}
					amount={'$199.99'}
					rating={'[4.5]'}
				/>
				<Card
					img={imgOne}
					title={'Canon Camera'}
					description={"Capturing Life's Precious Moments."}
					amount={'$199.99'}
					rating={'[4.5]'}
				/>
				<Card
					img={imgTwo}
					title={'Sony Headphones'}
					description={"Capturing Life's Precious Moments."}
					amount={'$199.99'}
					rating={'[4.5]'}
				/>
				<Card
					img={imgTwo}
					title={'Sony Headphones'}
					description={"Capturing Life's Precious Moments."}
					amount={'$199.99'}
					rating={'[4.5]'}
				/>
			</div>
		</motion.div>
	)
}

export default AfricanWear
