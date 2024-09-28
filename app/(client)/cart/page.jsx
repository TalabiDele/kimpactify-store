'use client'

import CartContainer from '/container/CartContainer'
import React, { useContext, useEffect } from 'react'
import Context from '/context/Context'

const page = () => {
	const { setLoading } = useContext(Context)

	useEffect(() => {
		setLoading(false)
	}, [])

	return (
		<div className=' w-[90vw] mx-auto'>
			<CartContainer />
		</div>
	)
}

export default page
