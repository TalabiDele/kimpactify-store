'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoChevronForward } from 'react-icons/io5'
import { motion } from 'framer-motion'

const CategoryNav = ({ isCategory, setIsCategory }) => {
	const variants = {
		open: { opacity: 1, y: 0 },
		closed: { opacity: 0, y: '-200%' },
	}

	return (
		<motion.div
			animate={isCategory ? 'open' : 'closed'}
			variants={variants}
			className='bg-white mx-auto mt-[1rem] shadow-sm px-[3rem] py-[1rem] rounded-sm absolute left-0 right-0 overflow-x-hidden z-[100]'
			onMouseLeave={() => setIsCategory(false)}
		>
			<div className=' grid grid-cols-5 justify-items-center'>
				<div className=' flex flex-col'>
					<Link
						href={'/categories/african-wears'}
						className=' flex items-center text-[#1E65FF] font-medium gap-1 uppercase mb-[1rem]'
					>
						African Wears <IoChevronForward />
					</Link>
					<Link
						href={'/categories/african-wears/african-sweaters'}
						className=' mb-[0.5rem] text-sm'
					>
						African Sweaters
					</Link>
					<Link
						href={'/categories/african-wears/african-palazzo'}
						className=' mb-[0.5rem] text-sm'
					>
						African Palazzo Pants
					</Link>
					<Link
						href={'/categories/african-wears/african-women-shorts'}
						className=' mb-[0.5rem] text-sm'
					>
						African Women Shorts
					</Link>
					<Link
						href={'/categories/african-wears/african-Men-shorts'}
						className=' mb-[0.5rem] text-sm'
					>
						African Men Shorts
					</Link>
					<Link
						href={'/categories/african-wears/agbada'}
						className=' mb-[0.5rem] text-sm'
					>
						Agbada Suit Set
					</Link>
					<Link
						href={'/categories/african-wears/ankara-blazers'}
						className=' mb-[0.5rem] text-sm'
					>
						Ankara Blazers
					</Link>
					<Link
						href={'/categories/african-wears/ankara-joggers'}
						className=' mb-[0.5rem] text-sm'
					>
						Ankara Up & Down (Joggers)
					</Link>
					<Link
						href={'/categories/african-wears/ankara-tops'}
						className=' mb-[0.5rem] text-sm'
					>
						Ankara Tops
					</Link>
					<Link
						href={'/categories/african-wears/maxi-dresses'}
						className=' mb-[0.5rem] text-sm'
					>
						Maxi Dresses
					</Link>
					<Link
						href={'/categories/african-wears/senator'}
						className=' mb-[0.5rem] text-sm'
					>
						Nigerian Suit Style
					</Link>
				</div>
				{/* Cooperate Wears */}
				<div className=' flex flex-col'>
					<Link
						href={'/categories/cooperate-wears'}
						className=' flex items-center text-[#1E65FF] font-medium gap-1 uppercase mb-[1rem]'
					>
						Cooperate Wears <IoChevronForward />
					</Link>
					<Link
						href={'/categories/cooperate-wears/pants'}
						className=' mb-[0.5rem] text-sm'
					>
						Pants
					</Link>
					<Link
						href={'/categories/cooperate-wears/tops'}
						className=' mb-[0.5rem] text-sm'
					>
						Tops
					</Link>
				</div>
				{/* Knit Wears */}
				<div className=' flex flex-col'>
					<Link
						href={'/categories/knit-wears'}
						className=' flex items-center text-[#1E65FF] font-medium gap-1 uppercase mb-[1rem]'
					>
						Knit Wears/Sweaters <IoChevronForward />
					</Link>
					<Link
						href={'/categories/knit-wears/hand-knitted-wears'}
						className=' mb-[0.5rem] text-sm'
					>
						Hand Knitted Wears
					</Link>
					<Link
						href={'/categories/knit-wears/machine-knitted-wears'}
						className=' mb-[0.5rem] text-sm'
					>
						Machine Knitted Wears
					</Link>
				</div>
				{/* 2 piece set */}
				<div className=' flex flex-col'>
					<Link
						href={'categories/two-piece-set'}
						className=' flex items-center text-[#1E65FF] font-medium gap-1 uppercase mb-[1rem]'
					>
						2 Piece Set <IoChevronForward />
					</Link>
					<Link
						href={'/categories/two-piece-set/bubu-plain-ankara'}
						className=' mb-[0.5rem] text-sm'
					>
						Bubu Plain & Ankara
					</Link>
					<Link
						href={'/categories/two-piece-set/crop-tops'}
						className=' mb-[0.5rem] text-sm'
					>
						Crop Tops
					</Link>
				</div>
				{/* Wrap Wears */}
				<div className=' flex flex-col'>
					<Link
						href={'/categories/wrap-wears'}
						className=' flex items-center text-[#1E65FF] font-medium gap-1 uppercase mb-[1rem]'
					>
						Wrap Wears <IoChevronForward />
					</Link>
					<Link
						href={'/categories/wrap-wears/wrap-tops'}
						className=' mb-[0.5rem] text-sm'
					>
						Wrap Tops
					</Link>
					<Link
						href={'/categories/wrap-wears/wrap-skirts'}
						className=' mb-[0.5rem] text-sm'
					>
						Wrap Skirts
					</Link>
					<Link
						href={'/categories/wrap-wears/wrap-gowns'}
						className=' mb-[0.5rem] text-sm'
					>
						Wrap Gowns
					</Link>
					<Link
						href={'/categories/wrap-wears/corset-tops'}
						className=' mb-[0.5rem] text-sm'
					>
						Corset Tops/Blouses
					</Link>
				</div>
			</div>
		</motion.div>
	)
}

export default CategoryNav
