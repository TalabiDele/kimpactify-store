import React from 'react'
import { FaStar } from 'react-icons/fa'
import { BtnCard, BtnFill } from './Buttons'
import toast from 'react-hot-toast'
import Image from 'next/image'

const OrderItem = ({ item }) => {
	const handlePlus = (id, qty) => {
		console.log(id, qty)
		setCart((prevItems) =>
			prevItems.map((item) =>
				item._id === id ? { ...item, quantity: qty + 1 } : item
			)
		)
	}

	const handleMinus = (id, qty) => {
		if (qty !== 1) {
			setCart((prevItems) =>
				prevItems.map((item) =>
					item._id === id ? { ...item, quantity: qty - 1 } : item
				)
			)
		}
	}

	const handleRemove = (id) => {
		const filteredItems = cart?.filter((item) => item._id !== id)

		console.log(filteredItems)
		setCart(filteredItems)

		toast.success('Product removed from cart!', {
			duration: 6000,
		})
	}

	return (
		<div>
			<div className=' mt-[1rem] flex items-center w-[60vw] justify-between border-b border-[#DFE2E6] p-[1rem]'>
				<div className='relative w-[7rem] h-[7rem]'>
					<Image
						src={item?.image[0]}
						className='rounded-md'
						fill
						objectFit='cover'
					/>
				</div>

				<div className=' text-sm'>
					<p className=' font-bold'>{item?.title}</p>
					<p className=''>{item?.description}</p>
				</div>

				<div className=' flex items-center'>
					<div className='flex items-center mr-[0.2rem]'>
						<FaStar color='#F7D977' fontSize={'0.7rem'} />
						<FaStar color='#F7D977' fontSize={'0.7rem'} />
						<FaStar color='#F7D977' fontSize={'0.7rem'} />
						<FaStar color='#F7D977' fontSize={'0.7rem'} />
						<FaStar color='#F7D977' fontSize={'0.7rem'} />
					</div>
					<p className=' text-[0.6rem]'>[{item?.rating}]</p>
				</div>

				<div className=' font-bold text-[#1E65FF] text-2xl'>
					${item?.pricing}
				</div>

				<div className=' flex items-center w-[5rem] justify-between'>
					<p
						className=' font-bold text-2xl cursor-pointer'
						onClick={() => handleMinus(item?._id, parseInt(item?.quantity, 10))}
					>
						-
					</p>
					<input
						type='number'
						value={item?.quantity}
						onChange={(e) => handleChange(e)}
						className=' w-[2rem] border border-[#E2E2E2] rounded-lg text-center remove-arrow'
					/>
					<p
						className=' font-bold text-2xl cursor-pointer'
						onClick={() => handlePlus(item?._id, parseInt(item?.quantity, 10))}
					>
						+
					</p>
				</div>

				<div className=' flex gap-[1rem] items-center'>
					<div className='' onClick={() => handleRemove(item?._id)}>
						<BtnCard text={'Remove item'} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderItem
