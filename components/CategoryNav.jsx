'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoChevronForward } from 'react-icons/io5'
import { motion } from 'framer-motion'

const CategoryNav = ({ isCategory, setIsCategory, setIsOpen }) => {
	const [isAfrican, setIsAfrican] = useState(false)
	const [isCorporate, setIsCorporate] = useState(false)
	const [isKnit, setIsKnit] = useState(false)
	const [isPiece, setIsPiece] = useState(false)
	const [isWrap, setIsWrap] = useState(false)

	const variants = {
		open: { opacity: 1, y: 0 },
		closed: { opacity: 0, y: '-200%' },
	}

	const handleAfrica = () => {
		setIsAfrican(!isAfrican)
		setIsCorporate(false)
		setIsKnit(false)
		setIsPiece(false)
		setIsWrap(false)
	}
	const handleWrap = () => {
		setIsAfrican(false)
		setIsCorporate(false)
		setIsKnit(false)
		setIsPiece(false)
		setIsWrap(!isWrap)
	}

	const handleCorporate = () => {
		setIsAfrican(false)
		setIsCorporate(!isCorporate)
		setIsKnit(false)
		setIsPiece(false)
		setIsWrap(false)
	}

	const handleKnit = () => {
		setIsAfrican(false)
		setIsCorporate(false)
		setIsKnit(!isKnit)
		setIsPiece(false)
		setIsWrap(false)
	}

	const handlePiece = () => {
		setIsAfrican(false)
		setIsCorporate(false)
		setIsKnit(false)
		setIsPiece(!isPiece)
		setIsWrap(false)
	}

	const handleClose = () => {
		setIsOpen(false)
		setIsCategory(false)
	}

	return (
		<motion.div
			animate={isCategory ? 'open' : 'closed'}
			variants={variants}
			className='bg-white mx-auto mt-[1rem] max-md:shadow-none shadow-sm px-[3rem] py-[1rem] rounded-sm absolute left-0 right-0 overflow-x-hidden z-[100] max-md:relative max-md:z-0 max-md:mt-0 max-md:py-0 max-md:px-[1rem] max-md:mx-0'
			onMouseLeave={() => setIsCategory(false)}
		>
			<div className=' grid grid-cols-5 justify-items-center max-md:grid-cols-1 max-md:justify-items-start max-md:gap-2'>
				<div
					className=' flex flex-col max-md:w-full max-md:cursor-pointer'
					onClick={handleAfrica}
				>
					<div className=' max-md:flex max-md:items-center max-md:justify-between max-md:w-[80%] flex items-center gap-2 mb-[0.5rem] max-md:mb-[0rem]'>
						<Link
							href={'/categories/african-wears'}
							className=' flex items-center text-[#1E65FF] font-medium gap-1 max-md:text-lg'
							onClick={handleClose}
						>
							African Wears
						</Link>
						<IoChevronForward color='#1E65FF' />
					</div>
					<div
						className={` grid max-md:mt-[1rem] ${
							isAfrican ? 'max-md:grid max-md:pl-[1rem]' : 'max-md:hidden'
						}`}
					>
						<Link
							href={'/categories/african-wears/african-sweaters'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							African Sweaters
						</Link>
						<Link
							href={'/categories/african-wears/african-palazzo'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							African Palazzo Pants
						</Link>
						<Link
							href={'/categories/african-wears/african-women-shorts'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							African Women Shorts
						</Link>
						<Link
							href={'/categories/african-wears/african-Men-shorts'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							African Men Shorts
						</Link>
						<Link
							href={'/categories/african-wears/agbada'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Agbada Suit Set
						</Link>
						<Link
							href={'/categories/african-wears/ankara-blazers'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Ankara Blazers
						</Link>
						<Link
							href={'/categories/african-wears/ankara-joggers'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Ankara Up & Down (Joggers)
						</Link>
						<Link
							href={'/categories/african-wears/ankara-tops'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Ankara Tops
						</Link>
						<Link
							href={'/categories/african-wears/maxi-dresses'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Maxi Dresses
						</Link>
						<Link
							href={'/categories/african-wears/senator'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Nigerian Suit Style
						</Link>
					</div>
				</div>
				{/* Cooperate Wears */}
				<div
					className=' flex flex-col max-md:w-full max-md:cursor-pointer'
					onClick={handleCorporate}
				>
					<div className=' max-md:flex max-md:items-center max-md:justify-between max-md:w-[80%] flex items-center gap-2 mb-[0.5rem] max-md:mb-[0rem]'>
						<Link
							href={'/categories/corporate-wears'}
							className=' flex items-center text-[#1E65FF] font-medium gap-1 max-md:text-lg'
							onClick={handleClose}
						>
							Corporate Wears
						</Link>
						<IoChevronForward color='#1E65FF' />
					</div>
					<div
						className={` grid max-md:mt-[1rem] ${
							isCorporate ? 'max-md:grid max-md:pl-[1rem]' : 'max-md:hidden'
						}`}
					>
						<Link
							href={'/categories/corporate-wears/pants'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Pants
						</Link>
						<Link
							href={'/categories/corporate-wears/tops'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Tops
						</Link>
					</div>
				</div>
				{/* Knit Wears */}
				<div
					className=' flex flex-col max-md:w-full max-md:cursor-pointer'
					onClick={handleKnit}
				>
					<div className=' max-md:flex max-md:items-center max-md:justify-between max-md:w-[80%] flex items-center gap-2 mb-[0.5rem] max-md:mb-[0rem]'>
						<Link
							href={'/categories/knit-wears'}
							className=' flex items-center text-[#1E65FF] font-medium gap-1 max-md:text-lg'
							onClick={handleClose}
						>
							Knit Wears/Sweaters
						</Link>
						<IoChevronForward color='#1E65FF' />
					</div>
					<div
						className={` grid max-md:mt-[1rem] ${
							isKnit ? 'max-md:grid max-md:pl-[1rem]' : 'max-md:hidden'
						}`}
					>
						<Link
							href={'/categories/knit-wears/hand-knitted-wears'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Hand Knitted Wears
						</Link>
						<Link
							href={'/categories/knit-wears/machine-knitted-wears'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Machine Knitted Wears
						</Link>
					</div>
				</div>
				{/* 2 piece set */}
				<div
					className=' flex flex-col max-md:w-full max-md:cursor-pointer'
					onClick={handlePiece}
				>
					<div className=' max-md:flex max-md:items-center max-md:justify-between max-md:w-[80%] flex items-center gap-2 mb-[0.5rem] max-md:mb-[0rem]'>
						<Link
							href={'/categories/two-piece-set'}
							className=' flex items-center text-[#1E65FF] font-medium gap-1 max-md:text-lg'
							onClick={handleClose}
						>
							2 Piece Set
						</Link>
						<IoChevronForward color='#1E65FF' />
					</div>
					<div
						className={` grid max-md:mt-[1rem] ${
							isPiece ? 'max-md:grid max-md:pl-[1rem]' : 'max-md:hidden'
						}`}
					>
						<Link
							href={'/categories/two-piece-set/bubu-plain-ankara'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Bubu Plain & Ankara
						</Link>
						<Link
							href={'/categories/two-piece-set/crop-tops'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Crop Tops
						</Link>
					</div>
				</div>
				{/* Wrap Wears */}
				<div
					className=' flex flex-col max-md:w-full max-md:cursor-pointer'
					onClick={handleWrap}
				>
					<div className=' max-md:flex max-md:items-center max-md:justify-between max-md:w-[80%] flex items-center gap-2 mb-[0.5rem] max-md:mb-[0rem]'>
						<Link
							href={'/categories/wrap-wears'}
							className=' flex items-center text-[#1E65FF] font-medium gap-1 max-md:text-lg'
							onClick={handleClose}
						>
							Wrap Wears
						</Link>
						<IoChevronForward color='#1E65FF' />
					</div>
					<div
						className={` grid max-md:mt-[1rem] ${
							isWrap ? 'max-md:grid max-md:pl-[1rem]' : 'max-md:hidden'
						}`}
					>
						<Link
							href={'/categories/wrap-wears/wrap-tops'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Wrap Tops
						</Link>
						<Link
							href={'/categories/wrap-wears/wrap-skirts'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Wrap Skirts
						</Link>
						<Link
							href={'/categories/wrap-wears/wrap-gowns'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Wrap Gowns
						</Link>
						<Link
							href={'/categories/wrap-wears/corset-tops'}
							className=' mb-[0.5rem] text-sm'
							onClick={handleClose}
						>
							Corset Tops/Blouses
						</Link>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default CategoryNav
