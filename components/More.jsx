import Link from 'next/link'
import React, { useContext } from 'react'
import { IoChevronForward } from 'react-icons/io5'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'
import Context from '../context/Context'

const More = ({ link }) => {
	const { loading } = useContext(Context)

	return (
		<div>
			{loading ? (
				<Skeleton className='h-4 w-[5rem] mt-[0.5rem]' />
			) : (
				<Link href={link}>
					<div className=' flex items-center text-sm gap-1 text-[#5C5C5C]'>
						See more <IoChevronForward />
					</div>
				</Link>
			)}
		</div>
	)
}

export default More
