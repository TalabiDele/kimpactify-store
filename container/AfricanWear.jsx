import React from 'react'
import Card from '../components/Card'
import imgOne from '../assets/imgs/cloth-1.png'
import imgTwo from '../assets/imgs/cloth-2.png'
import Heading from '../components/Heading'

const AfricanWear = () => {
	return (
		<div className=' mt-[3rem]'>
			<Heading text={'African Wears'} />
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
		</div>
	)
}

export default AfricanWear
