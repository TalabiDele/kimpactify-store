'use client'

import CartContainer from '/widgets/Cart/CartContainer'
import React, { useContext, useEffect } from 'react'
import Context from '/shared/config/Context'
import Link from 'next/link'
import { BtnFill } from '/shared/ui/Buttons'
import { useCartStore } from '/shared/store/cartStore'
import CardDisplay from '/widgets/ProductGrid/CardDisplay'

const page = () => {
	const { setLoading, productItem } = useContext(Context)
	const cart = useCartStore((state) => state.items)

	useEffect(() => {
		setLoading(false)
	}, [])

	const recommended = productItem?.slice(0, 4) || []

	return (
		<div className=' w-[90vw] mx-auto mb-24'>
			{cart?.length === 0 ? (
				<div className='flex items-center justify-center h-[50vh]'>
					<div className=' font-semibold text-3xl text-center'>
						No items in cart
						<div className='w-full mt-[1rem]'>
							<Link href={'/'}>
								<BtnFill text={'Keep shopping'} />
							</Link>
						</div>
					</div>
				</div>
			) : (
				<CartContainer />
			)}

			{recommended.length > 0 && (
				<div className='mt-24 pt-16 border-t border-slate-100'>
					<h2 className='text-3xl font-extrabold text-slate-900 mb-8'>Recommended For You</h2>
					<CardDisplay products={recommended} hideTitle={true} className="w-full mt-0" />
				</div>
			)}
		</div>
	)
}

export default page
