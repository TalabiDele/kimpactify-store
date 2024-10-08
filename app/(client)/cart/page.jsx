'use client'

import CartContainer from '/container/CartContainer'
import React, { useContext, useEffect } from 'react'
import Context from '/context/Context'
import Link from 'next/link'
import { BtnFill } from '/components/Buttons'

const page = () => {
	const { setLoading, cart } = useContext(Context)

	useEffect(() => {
		setLoading(false)
	}, [])

	return (
		<div className=' w-[90vw] mx-auto'>
			{cart?.length === 0 ? (
				<div className='flex items-center justify-center h-[70vh]'>
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
		</div>
	)
}

export default page
