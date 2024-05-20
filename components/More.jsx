import Link from 'next/link'
import React from 'react'
import { IoChevronForward } from 'react-icons/io5'

const More = ({ link }) => {
	return (
		<div>
			<Link href={link}>
				<div className=' flex items-center text-sm gap-1 text-[#5C5C5C]'>
					See more <IoChevronForward />
				</div>
			</Link>
		</div>
	)
}

export default More
