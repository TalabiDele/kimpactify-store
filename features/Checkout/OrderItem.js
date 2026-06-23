import React, { useContext } from 'react'
import { FaStar } from 'react-icons/fa'
import { BtnCard, BtnFill } from '/shared/ui/Buttons'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Context from '/shared/config/Context'
import { usePathname } from 'next/navigation'
import { useCartStore } from '/shared/store/cartStore'

const OrderItem = ({ item, order, setOrder }) => {
	const cart = useCartStore((state) => state.items)
	const updateQuantity = useCartStore((state) => state.updateQuantity)
	const removeItemStore = useCartStore((state) => state.removeItem)
	const pathname = usePathname()

	//(order)

	const handlePlus = (id, qty) => {
		//(id, qty)
		if (pathname === '/cart') {
			updateQuantity(id, qty + 1)
		} else {
			setOrder((prevItems) =>
				prevItems.map((item) =>
					item._id === id ? { ...item, quantity: qty + 1 } : item
				)
			)

			//(order)
		}
	}

	const handleMinus = (id, qty) => {
		//('working')
		if (qty !== 1) {
			if (pathname === '/cart') {
				updateQuantity(id, qty - 1)
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
		removeItemStore(id)

		toast.success('Product removed from cart!', {
			duration: 6000,
		})
	}

	return (
		<div className='flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-slate-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow'>
			<div className='relative w-[6rem] h-[6rem] shrink-0'>
				<Image
					src={item?.image[0]}
					className='rounded-xl object-cover'
					fill
					alt={item?.title}
				/>
			</div>

			<div className='flex flex-col flex-1 gap-2 w-full'>
				<div className='flex justify-between items-start w-full'>
					<div>
						<p className='font-bold text-lg text-slate-900'>{item?.title}</p>
						<p className='text-sm text-slate-500 max-w-[12rem] sm:max-w-xs truncate'>{item?.description}</p>
					</div>
					<div className='font-bold text-slate-900 text-xl shrink-0'>
						${item?.pricing}
					</div>
				</div>

				{item?.selectedSizes && item.selectedSizes.length > 0 && (
					<div className='flex items-center gap-2 mt-1'>
						{item?.selectedSizes?.map((size, index) => (
							<span
								className='bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-700'
								key={index}
							>
								{size}
							</span>
						))}
					</div>
				)}

				<div className='flex items-center justify-between mt-4 w-full'>
					<div className='flex items-center bg-slate-50 border border-slate-200 rounded-full h-10'>
						<button
							className='w-10 h-full flex items-center justify-center text-slate-600 hover:text-black font-bold text-lg transition-colors'
							onClick={() => handleMinus(item?._id, parseInt(item?.quantity, 10))}
						>
							-
						</button>
						<input
							type='text'
							readOnly
							value={item?.quantity}
							className='w-10 text-center bg-transparent text-sm font-semibold text-slate-900 outline-none'
						/>
						<button
							className='w-10 h-full flex items-center justify-center text-slate-600 hover:text-black font-bold text-lg transition-colors'
							onClick={() => handlePlus(item?._id, parseInt(item?.quantity, 10))}
						>
							+
						</button>
					</div>

					<button 
						onClick={() => handleRemove(item?._id)}
						className='text-sm font-medium text-red-500 hover:text-red-700 hover:underline transition-colors'
					>
						Remove
					</button>
				</div>
			</div>
		</div>
	)
}

export default OrderItem
