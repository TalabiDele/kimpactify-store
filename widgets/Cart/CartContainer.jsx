import CartItem from '/features/Cart/CartItem'
import Heading from '/shared/ui/Heading'
import React from 'react'

const CartContainer = () => {
	return (
		<div className=' mt-[3rem]'>
			<Heading text={'Cart'} />
			<CartItem />
		</div>
	)
}

export default CartContainer
