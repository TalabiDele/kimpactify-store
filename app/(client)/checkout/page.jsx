'use client'

import React, { Suspense, useContext } from 'react'
import Heading from '/shared/ui/Heading'
import CheckoutProducts from '/features/Cart/CheckoutProducts'
import Context from '/shared/config/Context'
import Loader from '/shared/ui/Loader'

const CheckoutPage = () => {
	const { isFetching } = useContext(Context)

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{isFetching && <Loader />}
			<div className=' w-[95vw] mx-auto mt-[5rem]'>
				<CheckoutProducts />
			</div>
		</Suspense>
	)
}

export default CheckoutPage
