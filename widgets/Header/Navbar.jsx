'use client'

import React, { useContext, useState, useEffect } from 'react'
import logo from '/assets/imgs/kimptrendz-logo.png'
import Image from 'next/image'
import Link from 'next/link'
import CategoryNav from './CategoryNav'
import { IoChevronDown } from 'react-icons/io5'
import { BsCart3 } from 'react-icons/bs'
import Context from '/shared/config/Context'
import { useCartStore } from '/shared/store/cartStore'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'
import { RiMenu3Line } from 'react-icons/ri'
import { IoCloseSharp } from 'react-icons/io5'

const Navbar = () => {
	const [isCategory, setIsCategory] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	const { loading } = useContext(Context)
	const cart = useCartStore((state) => state.items)

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header className='h-[90px] w-full mb-8 lg:mb-12'>
			<nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-white ${scrolled ? 'border-b border-gray-100 py-3' : 'py-5'}`}>
				<div className='w-[90vw] max-w-[1400px] mx-auto flex items-center justify-between'>
					{/* Logo */}
					{loading ? (
						<Skeleton className='h-[2.5rem] w-[8rem] rounded-md' />
					) : (
						<Link href='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
							<Image src={logo} alt='KimpTrendz' width={120} height={40} className='object-contain' />
						</Link>
					)}

					{/* Desktop Navigation */}
					<ul className='hidden md:flex items-center gap-10 text-[0.95rem] font-medium text-gray-600'>
						<li>
							{loading ? <Skeleton className='h-4 w-12' /> : (
								<Link href={'/'} className='hover:text-black transition-colors' onClick={() => setIsCategory(false)}>
									Home
								</Link>
							)}
						</li>
						<li>
							{loading ? <Skeleton className='h-4 w-16' /> : (
								<Link href={'/products'} className='hover:text-black transition-colors' onClick={() => setIsCategory(false)}>
									Shop
								</Link>
							)}
						</li>
						<li 
							className='relative'
							onMouseEnter={() => setIsCategory(true)}
							onMouseLeave={() => setIsCategory(false)}
						>
							{loading ? <Skeleton className='h-4 w-24' /> : (
								<div className='flex items-center gap-1 cursor-pointer hover:text-black transition-colors py-2'>
									Categories 
									<IoChevronDown className={`transition-transform duration-300 ${isCategory ? 'rotate-180' : ''}`} />
								</div>
							)}
							
							{/* Desktop Category Dropdown */}
							{isCategory && (
								<div className='absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[800px]'>
									<CategoryNav 
										isCategory={isCategory}
										setIsCategory={setIsCategory}
										setIsOpen={setIsOpen}
									/>
								</div>
							)}
						</li>
					</ul>

					{/* Right Side Icons */}
					<div className='flex items-center gap-6'>
						{loading ? (
							<Skeleton className='h-6 w-6 rounded-full' />
						) : (
							<Link href={'/cart'} className='relative hover:scale-110 transition-transform'>
								<BsCart3 className='text-gray-800' fontSize={22} />
								{cart?.length > 0 && (
									<div className='absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white'>
										{cart?.length}
									</div>
								)}
							</Link>
						)}

						{/* Mobile Menu Toggle */}
						<div className='md:hidden text-2xl cursor-pointer text-gray-800 hover:text-black transition-colors' onClick={() => setIsOpen(true)}>
							<RiMenu3Line />
						</div>
					</div>
				</div>

				{/* Mobile Menu Overlay */}
				<div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
					<div className={`fixed right-0 top-0 h-full w-[85%] max-w-[350px] bg-white p-6 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
						<div className='flex justify-end mb-8'>
							<IoCloseSharp className='text-3xl cursor-pointer text-gray-400 hover:text-black transition-colors' onClick={() => setIsOpen(false)} />
						</div>
						
						<ul className='flex flex-col gap-6 text-xl font-medium text-gray-800'>
							<li>
								<Link href={'/'} className='block hover:text-black transition-colors' onClick={() => setIsOpen(false)}>
									Home
								</Link>
							</li>
							<li>
								<Link href={'/products'} className='block hover:text-black transition-colors' onClick={() => setIsOpen(false)}>
									Shop
								</Link>
							</li>
							<li className='flex flex-col gap-4'>
								<div className='flex items-center justify-between cursor-pointer' onClick={() => setIsCategory(!isCategory)}>
									<span>Categories</span>
									<IoChevronDown className={`transition-transform duration-300 ${isCategory ? 'rotate-180' : ''}`} />
								</div>
								{isCategory && (
									<div className='pl-4 border-l-2 border-gray-100'>
										<CategoryNav 
											isCategory={isCategory}
											setIsCategory={setIsCategory}
											setIsOpen={setIsOpen}
										/>
									</div>
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Navbar
