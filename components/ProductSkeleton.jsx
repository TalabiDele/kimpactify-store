import React from 'react'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'

const ProductSkeleton = () => {
	return (
		<div className=' max-sm:grid max-sm:justify-center max-sm:w-[90vw]'>
			<div className=' bg-white p-[1rem] rounded-md mb-[2rem] text-[#5C5C5C] w-[95vw] mx-auto max-sm:mx-auto max-sm:w-[17rem] flex gap-[1rem]'>
				<Skeleton className='w-[50vw] h-[70vh]' />
				<div className=' '>
					<Skeleton className='h-[2rem] w-[15rem] mt-[0.5rem]' />
					<Skeleton className='h-[2rem] w-[10rem] mt-[0.5rem]' />
					<Skeleton className='h-[1rem] w-[7rem] mt-[0.5rem]' />
					<Skeleton className='h-[5rem] w-[30rem] mt-[0.5rem]' />
				</div>
			</div>
		</div>
	)
}

export default ProductSkeleton
