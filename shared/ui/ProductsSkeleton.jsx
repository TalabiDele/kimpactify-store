import React from 'react'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'
import CardSkeleton from './CardSkeleton'

export const ProductsSkeleton = () => {
	return (
		<div className='w-[95vw] mx-auto mb-24'>
			{/* Top Bar Skeleton */}
			<div className='flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-4 mb-12'>
				<Skeleton className='h-10 w-48' />
				
				<div className='flex items-center gap-6 w-full sm:w-auto'>
					<Skeleton className='h-8 w-full sm:w-[250px]' />
				</div>
			</div>

			<div className='flex flex-col lg:flex-row gap-16 relative items-start'>
				{/* Sidebar Filters Skeleton */}
				<div className='hidden lg:block w-[220px] shrink-0'>
					{/* Sort By Skeleton */}
					<div className='mb-10'>
						<Skeleton className='h-3 w-16 mb-4' />
						<Skeleton className='h-8 w-full' />
					</div>

					{/* Categories Skeleton */}
					<div className='mb-10'>
						<Skeleton className='h-3 w-20 mb-4' />
						<div className='flex flex-col gap-3'>
							{[...Array(5)].map((_, i) => (
								<Skeleton key={i} className='h-4 w-24' />
							))}
						</div>
					</div>

					{/* Sizes Skeleton */}
					<div className='mb-10'>
						<Skeleton className='h-3 w-16 mb-4' />
						<div className='flex flex-wrap gap-2'>
							{[...Array(6)].map((_, i) => (
								<Skeleton key={i} className='h-8 w-12' />
							))}
						</div>
					</div>

					{/* Price Range Skeleton */}
					<div className='mb-10'>
						<div className='flex justify-between mb-4'>
							<Skeleton className='h-3 w-16' />
							<Skeleton className='h-3 w-12' />
						</div>
						<Skeleton className='h-2 w-full rounded-full' />
					</div>
				</div>

				{/* Product Grid Skeleton */}
				<div className='flex-1 w-full'>
					<div className='flex justify-between items-center mb-8 pb-4 border-b border-gray-100'>
						<Skeleton className='h-3 w-16' />
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[...Array(9)].map((_, i) => (
							<CardSkeleton key={i} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
