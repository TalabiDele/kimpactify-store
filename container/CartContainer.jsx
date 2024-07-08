import CartItem from '../components/CartItem'
import Heading from '../components/Heading'
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
