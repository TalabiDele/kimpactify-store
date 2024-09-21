'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
// import shoe from '../assets/imgs/shoe.png'

const ImageDisplay = ({ product }) => {
	const [active, setActive] = useState()

	useEffect(() => {
		setActive(product?.image[0])
	}, [product])

	const handleActive = (url) => {
		setActive(url)
	}

	return (
		<div>
			{product && (
				<div className=' w-[50vw] h-[50rem] relative mb-[2rem]'>
					<Image
						src={`${active}`}
						fill
						alt={active}
						objectFit='cover'
						objectPosition='center'
						className='rounded-md'
					/>
				</div>
			)}

			<div className=' flex'>
				{product?.image?.map((image) => (
					<div
						key={image}
						className={`${
							active === image && 'border-2 border-blue-700 rounded-md'
						} mr-[1rem] p-[0.2rem] cursor-pointer relative h-[5rem] w-[5rem]`}
						onClick={() => handleActive(image)}
					>
						<Image
							src={image}
							fill
							alt={image}
							objectFit='cover'
							className='rounded-md'
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default ImageDisplay
