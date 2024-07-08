'use client'

import Image from 'next/image'
import Context from '../context/Context'
import React, { useContext } from 'react'
import { FaStar } from 'react-icons/fa'
import { BtnCard, BtnFill } from './Buttons'

const CartItem = () => {
	const { cart } = useContext(Context)

	const handleRemoveItem = () => {
		console.log(remove)
	}

	return (
		<div>
			{cart?.map((item) => (
				<div className=' mt-[1rem] flex items-center w-[70vw] justify-between border-b border-[#DFE2E6] p-[1rem]'>
					<Image
						src={`/${item?.image[0]}`}
						width={100}
						height={150}
						objectFit='cover'
					/>

					<div className=' text-sm'>
						<p className=' font-bold'>{item?.title}</p>
						<p className=''>{item?.description}</p>
					</div>

					<div className=' flex items-center mb-[1rem] mt-[0.5rem]'>
						<div className='flex items-center mr-[0.2rem]'>
							<FaStar color='#F7D977' fontSize={'0.7rem'} />
							<FaStar color='#F7D977' fontSize={'0.7rem'} />
							<FaStar color='#F7D977' fontSize={'0.7rem'} />
							<FaStar color='#F7D977' fontSize={'0.7rem'} />
							<FaStar color='#F7D977' fontSize={'0.7rem'} />
						</div>
						<p className=' text-[0.6rem]'>[{item?.rating}]</p>
					</div>

					<div className=' font-bold text-[#1E65FF]'>${item?.pricing}</div>

					<div className=' flex gap-[1rem] mt-[1rem]'>
						<BtnFill text={'Buy now'} />
						<div className=''>
							<BtnCard text={'Remove item'} icon={<MdOutlineShoppingCart />} />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default CartItem
