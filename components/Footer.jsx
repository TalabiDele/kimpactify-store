'use client'

import React, { useContext } from 'react'
import Image from 'next/image'
import logo from '../assets/imgs/kimptrendz-logo.png'
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
					<div className=' flex justify-between text-sm w-[90vw] mx-auto'>
						<div className=' w-[15rem]'>
							<Image src={logo} alt='' />
							<p className=''>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
								labore tenetur cumque placeat facilis corrupti.
							</p>
						</div>

						<ul className=''>
							<li className=' font-medium mb-[1rem]'>Getting started</li>
							<li className=' mb-[0.5rem]'>
								<Link href={''}>Home</Link>
							</li>
							<li className=' mb-[0.5rem]'>
								<Link href={''}>Buy now</Link>
							</li>
							<li className=' mb-[0.5rem]'>
								<Link href={''}>Products</Link>
							</li>
							<li className=' mb-[0.5rem]'>
								<Link href={''}>Categories</Link>
							</li>
						</ul>

						<ul className=''>
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

						<ul className=''>
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
