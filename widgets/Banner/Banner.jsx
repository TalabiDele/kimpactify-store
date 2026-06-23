'use client'

import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'
import Context from '/shared/config/Context'
import Link from 'next/link'

const Banner = ({ heading, text }) => {
	const { loading } = useContext(Context)

	return (
		<motion.div className="w-full">
			{loading ? (
				<Skeleton className='h-[25rem] w-full mt-[1rem] rounded-3xl' />
			) : (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className='relative overflow-hidden flex flex-col justify-center items-start mt-[2rem] mb-[4rem] rounded-[2rem] p-[4rem] text-left min-h-[35rem] max-md:p-[2rem]'
					style={{
						backgroundImage: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2940&auto=format&fit=crop")',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					{/* Dark overlay to ensure text readability */}
					<div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

					<div className='relative z-10 w-[60%] max-md:w-[100%] flex flex-col items-start'>
						<h1 className='font-extrabold text-[4.5rem] leading-[1.1] max-md:text-[2.5rem] tracking-tight text-white drop-shadow-md'>
							{heading}
						</h1>
						<p className='text-[1.2rem] leading-relaxed my-[2rem] max-md:my-[1.5rem] text-slate-100 max-w-2xl font-medium drop-shadow'>
							{text}
						</p>
						<div className='flex gap-[1rem] mt-4 flex-wrap'>
							<Link href="/products">
								<button className="bg-[#ffd138] text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-amber-400 hover:scale-105 transition-all duration-300 shadow-lg">
									Shop Collection
								</button>
							</Link>
							<button className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300">
								Explore Lookbook
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</motion.div>
	)
}

export default Banner
