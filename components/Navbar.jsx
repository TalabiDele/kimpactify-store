'use client'

import React, { useContext, useState } from 'react'
import logo from '../assets/imgs/kimptrendz-logo.png'
import Image from 'next/image'
import Link from 'next/link'
import CategoryNav from './CategoryNav'
import { IoChevronForward } from 'react-icons/io5'
import { BsCart3 } from 'react-icons/bs'
import Context from '../context/Context'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'
import { RiMenu3Line } from 'react-icons/ri'
import { IoCloseSharp } from 'react-icons/io5'

const Navbar = () => {
	const [isCategory, setIsCategory] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	const { cart, loading } = useContext(Context)

	const variants = {
		open: { opacity: 1, x: 0 },
		closed: { opacity: 0, x: '-100%' },
	}

	return (
		<div className=''>
			<div className=' py-[1rem] bg-white shadow-sm'>
				<div className=' w-[90vw] mx-auto flex items-center justify-between'>
					{loading ? (
						<Skeleton className='h-[3rem] w-[3rem] rounded-full mt-[0.5rem]' />
					) : (
						<Image src={logo} alt='' width={100} height={100} />
					)}

					<div className=' gap-5 items-center hidden max-md:flex'>
						{loading ? (
							<Skeleton className='h-3 w-[3rem] mt-[0.5rem]' />
						) : (
							<Link href={'/cart'} className=' relative'>
								<BsCart3 className='' fontSize={20} />
								<div className=' text-sm bg-black text-[#fff] text-center rounded-full absolute w-[1rem] h-[1rem] flex items-center justify-center -top-[0.5rem] -right-[0.5rem]'>
									{cart?.length}
								</div>
							</Link>
						)}

						{/* Mobile menu */}
						<div className=' transition ease-in-out delay-150 duration-300'>
							<div>
								<div
									className=' hidden max-md:block text-3xl cursor-pointer'
									onClick={() => setIsOpen(true)}
								>
									<RiMenu3Line />
								</div>
							</div>
							<div
								className={` fixed z-[100] bg-black bg-opacity-60 top-0 left-0 bottom-0 w-[100vw] h-[100vh] transition ease-in-out delay-150 duration-300 ${
									isOpen ? 'block' : 'hidden'
								}`}
							>
								<div
									className=' absolute right-[2rem] top-[1rem] cursor-pointer z-[200] text-black text-3xl'
									onClick={() => setIsOpen(false)}
								>
									<IoCloseSharp />
								</div>
								<div
									className={` bg-white w-[80%] fixed right-0 h-[100vh] p-[2rem] transition ease-in-out delay-150 duration-300 ${
										isOpen
											? ' translate-x-0 transition ease-in-out delay-150 duration-300'
											: 'translate-x-full transition ease-in-out delay-150 duration-300'
									}`}
								>
									<ul className=' font-semibold text-xl grid gap-5'>
										<li>
											<Link href={'/'} onClick={() => setIsOpen(false)}>
												Home
											</Link>
										</li>
										<li>
											<Link href={'/products'} onClick={() => setIsOpen(false)}>
												Products
											</Link>
										</li>
										<li onMouseEnter={() => setIsCategory(true)}>
											<div
												className=' flex items-center gap-1 w-full justify-between cursor-pointer'
												onClick={() => setIsOpen(false)}
											>
												Categories <IoChevronForward />
											</div>
										</li>
										{isCategory && (
											<CategoryNav
												isCategory={isCategory}
												setIsCategory={setIsCategory}
												setIsOpen={setIsOpen}
											/>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>

					<ul className=' flex justify-between w-[30vw] items-center text-sm font-medium max-md:hidden'>
						<li>
							{loading ? (
								<Skeleton className='h-3 w-[3rem] mt-[0.5rem]' />
							) : (
								<Link href={'/'} onClick={() => setIsCategory(false)}>
									Home
								</Link>
							)}
						</li>
						{/* <li>
							{loading ? (
								<Skeleton className='h-3 w-[3rem] mt-[0.5rem]' />
							) : (
								<Link href={'/track-order'}>Track order</Link>
							)}
						</li> */}
						<li>
							{loading ? (
								<Skeleton className='h-3 w-[3rem] mt-[0.5rem]' />
							) : (
								<Link href={'/products'} onClick={() => setIsCategory(false)}>
									Products
								</Link>
							)}
						</li>
						<li
							onMouseEnter={() => setIsCategory(true)}
							// onMouseLeave={() => setIsCategory(false)}
						>
							{loading ? (
								<Skeleton className='h-3 w-[3rem] mt-[0.5rem]' />
							) : (
								<div
									className=' flex items-center gap-1 cursor-pointer'
									onClick={() => setIsCategory(false)}
								>
									Categories <IoChevronForward />
								</div>
							)}
						</li>
						<li>
							{loading ? (
								<Skeleton className='h-3 w-[3rem] mt-[0.5rem]' />
							) : (
								<Link
									href={'/cart'}
									className=' relative'
									onClick={() => setIsCategory(false)}
								>
									<BsCart3 className='' fontSize={20} />
									<div className=' text-sm bg-black text-[#fff] text-center rounded-full absolute w-[1rem] h-[1rem] flex items-center justify-center -top-[0.5rem] -right-[0.5rem]'>
										{cart?.length}
									</div>
								</Link>
							)}
						</li>
						{/* <li>
							{loading ? (
								<Skeleton className='h-3 w-[3rem] mt-[0.5rem]' />
							) : (
								<button className=' border text-[#8996A2] border-[#8996A2] py-[0.5rem] px-[1rem] rounded-2xl'>
									Sign in
								</button>
							)}
						</li> */}
					</ul>
				</div>
			</div>
			{isCategory && (
				<div className=' max-md:hidden'>
					<CategoryNav
						isCategory={isCategory}
						setIsCategory={setIsCategory}
						setIsOpen={setIsOpen}
					/>
				</div>
			)}
		</div>
	)
}

export default Navbar
