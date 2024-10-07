'use client'

import React, { Suspense, useContext } from 'react'
import Heading from '/components/Heading'
import CheckoutProducts from '/components/CheckoutProducts'
import Context from '/context/Context'
import Loader from '/components/Loader'

const CheckoutPage = () => {
	const { isFetching } = useContext(Context)

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{isFetching && <Loader />}
			<div className=' w-[95vw] mx-auto mt-[2rem]'>
				<Heading text='Checkout' />
				<CheckoutProducts />
			</div>
		</Suspense>
	)
}

export default CheckoutPage
