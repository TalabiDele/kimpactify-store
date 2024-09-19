'use client'

import React, { useContext } from 'react'
import Context from '../context/Context'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'

const Heading = ({ text }) => {
	const { loading } = useContext(Context)

	return (
		<div>
			{loading ? (
				<Skeleton className='h-5 w-[6rem] mt-[0.5rem]' />
			) : (
				<h1 className=' font-bold text-2xl text-[#333333]'>{text}</h1>
			)}
		</div>
	)
}

export default Heading
