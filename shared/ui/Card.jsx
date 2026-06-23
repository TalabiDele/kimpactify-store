import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { BtnCard } from './Buttons'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Card = ({ img, title, description, amount, rating, id, link, fullWidth }) => {
	const blurUrl = typeof img === 'string' && img.includes('upload') 
		? img.replace('/upload/', '/upload/w_20,e_blur:1000,q_auto,f_webp/') 
		: undefined;

	return (
		<motion.div 
			className={`cursor-pointer group h-full ${fullWidth ? 'w-full' : 'max-sm:grid max-sm:justify-center'}`}
			whileHover={{ opacity: 0.85, transition: { duration: 0.2, ease: "easeInOut" } }}
		>
			<Link href={link} className="h-full block">
				<div
					className={`bg-white rounded-2xl overflow-hidden mb-[2rem] text-[#333] grid border border-gray-200 transition-colors duration-300 hover:border-gray-400 h-full flex flex-col ${fullWidth ? 'w-full' : 'w-[16rem] max-sm:mx-auto max-sm:w-[13rem] max-md:w-[14rem] max-[460px]:w-[18rem]'}`}
				>
					<div className={`w-full relative overflow-hidden bg-gray-50 ${fullWidth ? 'h-[24rem]' : 'h-[14rem]'}`}>
						<Image 
							src={img} 
							fill 
							className='object-cover group-hover:scale-105 transition-transform duration-500 ease-out' 
							alt={title}
							placeholder={blurUrl ? "blur" : "empty"}
							blurDataURL={blurUrl}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
					<div className="p-5 flex flex-col justify-between flex-grow">
						<div>
							<h3 className='font-bold text-[1rem] leading-tight text-slate-900 truncate'>{title}</h3>
							<p className='text-[0.75rem] mt-2 text-slate-500 line-clamp-2 leading-relaxed'>
								{description}
							</p>
						</div>
						
						<div className='flex items-center justify-between mt-5 pt-4 border-t border-slate-100'>
							<div className='flex flex-col'>
								<span className='font-extrabold text-lg text-slate-900 tracking-tight'>{amount}</span>
								<div className='flex items-center gap-1 mt-1'>
									<FaStar className="text-amber-400" fontSize={'0.7rem'} />
									<span className='text-[0.65rem] font-medium text-slate-500'>
										{rating && rating !== '[undefined]' ? rating.replace(/[\[\]]/g, '') : '5.0'}
									</span>
								</div>
							</div>

							<button className="bg-[#ffd138] text-slate-900 text-xs font-bold px-5 py-2.5 rounded-full hover:bg-amber-400 hover:scale-105 transition-all duration-200 shadow-sm">
								Buy
							</button>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	)
}

export default Card
