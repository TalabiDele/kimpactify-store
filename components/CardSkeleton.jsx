import React from 'react'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'

const CardSkeleton = () => {
	return (
		<div className=' max-sm:grid max-sm:justify-center max-sm:w-[90vw]'>
			<div className=' bg-white p-[1rem] rounded-md mb-[2rem] text-[#5C5C5C] w-[15rem] grid  max-sm:mx-auto max-sm:w-[17rem] '>
				<Skeleton className='w-[15rem] h-[17rem]' />
				<Skeleton className='h-2 w-[5rem] mt-[0.5rem]' />
				<div className=' flex justify-between'>
					<div className=''>
						<Skeleton className='h-3 w-[4rem] mt-[0.5rem]' />
						<Skeleton className='h-2 w-[5rem] mt-[0.5rem]' />
					</div>
					<Skeleton className='h-5 w-[5rem] mt-[0.5rem]' />
				</div>
			</div>
		</div>
	)
}

export default CardSkeleton
