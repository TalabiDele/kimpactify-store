'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
// import shoe from '../assets/imgs/shoe.png'

const ImageDisplay = ({ product }) => {
	const [active, setActive] = useState(product?.image[0])

	useEffect(() => {
		setActive(product?.image[0])
	}, [product])

	const handleActive = (url) => {
		setActive(url)

		console.log(url)
	}

	return (
		<div>
			{product && (
				<div className=' w-[20rem] mb-[2rem]'>
					<Image src={`/${active}`} height={300} width={500} alt={active} />
				</div>
			)}

			<div className=' flex'>
				{product?.image?.map((image) => (
					<div
						key={image}
						className={`${
							active === image && 'border-2 border-blue-700 rounded-md'
						} mr-[1rem] p-[0.2rem] cursor-pointer`}
						onClick={() => handleActive(image)}
					>
						<Image src={`/${image}`} height={80} width={80} alt={image} />
					</div>
				))}
			</div>
		</div>
	)
}

export default ImageDisplay
