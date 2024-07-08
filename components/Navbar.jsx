'use client'

import React, { useContext, useState } from 'react'
import logo from '../assets/imgs/kimptrendz-logo.png'
import Image from 'next/image'
import Link from 'next/link'
import CategoryNav from './CategoryNav'
import { IoChevronForward } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { BsCart3 } from 'react-icons/bs'
import Context from '../context/Context'

const Navbar = () => {
	const [isCategory, setIsCategory] = useState(false)

	const { cart } = useContext(Context)

	const variants = {
		open: { opacity: 1, x: 0 },
		closed: { opacity: 0, x: '-100%' },
	}

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
							<Link href={'/cart'} className=' relative'>
								<BsCart3 className='' fontSize={20} />
								<div className=' text-sm bg-black text-[#fff] text-center rounded-full absolute w-[1rem] h-[1rem] flex items-center justify-center -top-[0.5rem] -right-[0.5rem]'>
									{cart?.length}
								</div>
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
			<CategoryNav isCategory={isCategory} setIsCategory={setIsCategory} />
		</div>
	)
}

export default Navbar
