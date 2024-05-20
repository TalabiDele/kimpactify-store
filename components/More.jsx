import Link from 'next/link'
import React from 'react'
import { FaChevronRight } from 'react-icons/fa'

const More = ({ link }) => {
	return (
		<div>
			<Link href={link}>
				<div className=' flex items-center text-sm gap-2 text-[#5C5C5C]'>
					See more <FaChevronRight />
				</div>
			</Link>
		</div>
	)
}

export default More
