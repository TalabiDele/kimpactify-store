import React, { useContext } from 'react'
import { FaStar } from 'react-icons/fa'
import { BtnCard, BtnFill } from './Buttons'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Context from '/context/Context'
import { usePathname } from 'next/navigation'

const OrderItem = ({ item, order, setOrder }) => {
	const { setCart, cart } = useContext(Context)
	const pathname = usePathname()

	console.log(order)

	const handlePlus = (id, qty) => {
		console.log(id, qty)
		if (pathname === '/cart') {
			setCart((prevItems) =>
				prevItems.map((item) =>
					item._id === id ? { ...item, quantity: qty + 1 } : item
				)
			)
		} else {
			setOrder((prevItems) =>
				prevItems.map((item) =>
					item._id === id ? { ...item, quantity: qty + 1 } : item
				)
			)

			console.log(order)
		}
	}

	const handleMinus = (id, qty) => {
		console.log('working')
		if (qty !== 1) {
			if (pathname === '/cart') {
				setCart((prevItems) =>
					prevItems.map((item) =>
						item._id === id ? { ...item, quantity: qty - 1 } : item
					)
				)
			} else {
				setOrder((prevItems) =>
					prevItems.map((item) =>
						item._id === id ? { ...item, quantity: qty - 1 } : item
					)
				)
			}
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

				<div className=' flex items-center gap-2'>
					{item?.selectedSizes?.map((size, index) => (
						<p
							className=' bg-blue-100 rounded-md p-[0.3rem] text-sm text-blue-600 cursor-pointer'
							key={index}
						>
							{size}
						</p>
					))}
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
