import React from 'react'
import Heading from '/components/Heading'
import CheckoutProducts from '/components/CheckoutProducts'

const CheckoutPage = () => {
	return (
		<div className=' w-[95vw] mx-auto mt-[2rem]'>
			<Heading text='Checkout' />
			<CheckoutProducts />
		</div>
	)
}

export default CheckoutPage
