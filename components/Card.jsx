import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { BtnCard } from './Buttons'
import Link from 'next/link'

const Card = ({ img, title, description, amount, rating, id, link }) => {
	return (
		<div className=' max-sm:grid max-sm:justify-center max-sm:w-[90vw]'>
			<div
				className=' bg-white p-[1rem] rounded-md mb-[2rem] text-[#5C5C5C] w-[15rem] grid  max-sm:mx-auto max-sm:w-[17rem]'
				style={{ boxShadow: '0px 0px 10px #cfcfcf7d' }}
			>
				<div className=' w-[10rem] h-[12rem] justify-self-center'>
					<Image src={img} alt='' objectFit='cover' />
				</div>
				<p className=' font-bold text-[0.8rem]'>{title}</p>
				<p className=' text-[0.6rem] mt-[0.3rem] border-b border-[#B3B9C4] pb-[0.5rem]'>
					{description}
				</p>
				<div className=' flex items-center justify-between mt-[0.5rem]'>
					<div className=''>
						<p className='font-bold text-black mb-[0.3rem]'>{amount}</p>
						<div className=' flex items-center'>
							<div className='flex items-center mr-[0.2rem]'>
								<FaStar color='#F7D977' fontSize={'0.7rem'} />
								<FaStar color='#F7D977' fontSize={'0.7rem'} />
								<FaStar color='#F7D977' fontSize={'0.7rem'} />
								<FaStar color='#F7D977' fontSize={'0.7rem'} />
								<FaStar color='#F7D977' fontSize={'0.7rem'} />
							</div>
							<p className=' text-[0.6rem]'>{rating}</p>
						</div>
					</div>

					<Link href={link}>
						<BtnCard text={'Buy now'} />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Card
