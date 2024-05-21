'use client'

import React, { useState } from 'react'
import logo from '../assets/imgs/kimptrendz-logo.png'
import Image from 'next/image'
import Link from 'next/link'
import CategoryNav from './CategoryNav'
import { IoChevronForward } from 'react-icons/io5'

const Navbar = () => {
	const [isCategory, setIsCategory] = useState(false)

	return (
		<div className=''>
			<div className=' py-[1rem] bg-white shadow-sm'>
				<div className=' w-[90vw] mx-auto flex items-center justify-between'>
					<Image src={logo} alt='' />
					<ul className=' flex justify-between w-[40vw] items-center text-sm font-medium'>
						<li>
							<Link href={'/'}>Home</Link>
						</li>
						<li>
							<Link href={'/track-order'}>Track order</Link>
						</li>
						<li>
							<Link href={'/products'}>Products</Link>
						</li>
						<li
							onMouseEnter={() => setIsCategory(true)}
							// onMouseLeave={() => setIsCategory(false)}
						>
							<Link href={'/categories'} className=' flex items-center gap-1'>
								Categories <IoChevronForward />
							</Link>
						</li>
						<li>
							<button className=' border text-[#8996A2] border-[#8996A2] py-[0.5rem] px-[1rem] rounded-2xl'>
								Sign in
							</button>
						</li>
					</ul>
				</div>
			</div>

			{isCategory && <CategoryNav setIsCategory={setIsCategory} />}
		</div>
	)
}

export default Navbar
