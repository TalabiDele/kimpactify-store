'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaCircleChevronRight, FaCircleChevronLeft } from 'react-icons/fa6'

const ImageDisplay = ({ product }) => {
	const [active, setActive] = useState()
	const [imageIndex, setImageIndex] = useState(0)

	useEffect(() => {
		setActive(product?.image[0])
	}, [product])

	const handleActive = (url, index) => {
		setActive(url)
	}

	// const handleNext = () => {
	// 	if (imageIndex <= product?.image?.length - 1) {
	// 		setImageIndex(imageIndex + 1)
	// 		console.log(product?.image?.length - 1, imageIndex)
	// 		console.log(imageIndex)

	// 		setActive(product?.image[imageIndex])
	// 	}
	// }

	const handleNext = () => {
		if (imageIndex < product?.image?.length - 1) {
			setImageIndex(imageIndex + 1)

			setActive(product?.image[imageIndex + 1])
		}
	}

	const handlePrevious = () => {
		if (imageIndex > 0) {
			setImageIndex(imageIndex - 1)
			setActive(product?.image[imageIndex - 1])
		}
	}

	return (
		<div>
			{product && (
				<div className=' relative'>
					<div className=' w-[50vw] h-[50rem] relative mb-[2rem] max-xl:h-[40rem] max-lg:h-[30rem] max-md:w-[90vw] max-md:mx-auto'>
						<Image
							src={`${active}`}
							fill
							alt={active}
							objectFit='cover'
							objectPosition='center'
							className='rounded-md'
						/>
					</div>
					<div className='absolute text-4xl z-10 text-white flex items-center top-[50%] justify-between w-full px-[1rem]'>
						{imageIndex !== 0 ? (
							<FaCircleChevronLeft
								className=' cursor-pointer'
								onClick={handlePrevious}
							/>
						) : (
							<div></div>
						)}
						{imageIndex !== product?.image?.length - 1 && (
							<FaCircleChevronRight
								className=' cursor-pointer'
								onClick={handleNext}
							/>
						)}
					</div>
				</div>
			)}

			<div className=' flex max-md:w-[90vw] max-md:mx-auto'>
				{product?.image?.map((image, index) => (
					<div
						key={image}
						className={`${
							active === image && 'border-2 border-blue-700 rounded-md'
						} mr-[1rem] p-[0.2rem] cursor-pointer relative h-[5rem] w-[5rem] max-md:w-[3rem] max-md:h-[3rem]`}
						onClick={() => handleActive(image, index)}
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
