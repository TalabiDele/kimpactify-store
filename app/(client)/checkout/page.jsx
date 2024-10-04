'use client'

import React, { useContext } from 'react'
import Heading from '/components/Heading'
import CheckoutProducts from '/components/CheckoutProducts'
import Context from '/context/Context'
import Loader from '/components/Loader'

const CheckoutPage = () => {
	const { isFetching } = useContext(Context)

	return (
		<>
			{isFetching && <Loader />}
			<div className=' w-[95vw] mx-auto mt-[2rem]'>
				<Heading text='Checkout' />
				<CheckoutProducts />
			</div>
		</>
	)
}

export default CheckoutPage
