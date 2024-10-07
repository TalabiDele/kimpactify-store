'use client'

import React, { useContext } from 'react'
import Image from 'next/image'
import logo from '../assets/imgs/kimptrendz-logo-white.png'
import Link from 'next/link'
import Context from '../context/Context'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'

const Footer = () => {
	const { loading } = useContext(Context)

	return (
		<>
			{loading ? (
				<Skeleton className='h-[30vh] w-[100%] mt-[0.5rem]' />
			) : (
				<div className=' mt-[4rem] py-[4rem] bg-[#1a1a1a] text-white'>
					<div className=' flex justify-between text-sm w-[90vw] mx-auto flex-wrap max-md:grid max-md:grid-cols-2 max-md:justify-normal max-md:gap-5 max-sm:grid-cols-1'>
						<div className=' w-[15rem]'>
							<Image src={logo} alt='' width={100} height={100} />
							<p className=''>
								Define your look with effortless elegance, from statement pieces
								to wardrobe essentials
							</p>
						</div>

						<ul className=' max-md:justify-self-center max-sm:justify-self-start'>
							<li className=' font-medium mb-[1rem]'>Getting started</li>
							<li className=' mb-[0.5rem]'>
								<Link href={'/'}>Home</Link>
							</li>
							<li className=' mb-[0.5rem]'>
								<Link href={'/products'}>Buy now</Link>
							</li>
							<li className=' mb-[0.5rem]'>
								<Link href={'/products'}>Products</Link>
							</li>
							<li className=' mb-[0.5rem]'>
								<Link href={'/'}>Categories</Link>
							</li>
						</ul>

						<ul className=' '>
							<li className=' font-medium mb-[1rem]'>Company</li>
							<li className=' mb-[0.5rem]'>
								<Link href={''}>About us</Link>
							</li>
							<li className=' mb-[0.5rem]'>
								<Link href={''}>Services</Link>
							</li>
							<li className=' mb-[0.5rem]'>
								<Link href={''}>Contact us</Link>
							</li>
						</ul>

						<ul className='max-md:justify-self-center max-sm:justify-self-start'>
							<li className=' font-medium mb-[1rem]'>Resources</li>
							<li className=' mb-[0.5rem]'>
								<Link href={''}>Terms & Conditions</Link>
							</li>
							<li className=' mb-[0.5rem]'>
								<Link href={''}>Privacy Policy</Link>
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	)
}

export default Footer
