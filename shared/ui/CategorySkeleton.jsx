import React from 'react'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'
import CardSkeleton from './CardSkeleton'

export const CategorySkeleton = () => {
	return (
		<div className="w-full">
			{/* Top Picks Skeleton */}
			<div className="w-full mb-12 bg-slate-50/50 p-6 lg:p-8 rounded-[2rem] border border-slate-100 shadow-sm">
				<div className="flex items-center justify-between mb-8">
					<div>
						<Skeleton className="h-8 w-48 mb-2" />
						<Skeleton className="h-4 w-32" />
					</div>
					<div className="hidden sm:flex gap-1">
						<Skeleton className="w-2 h-2 rounded-full" />
						<Skeleton className="w-2 h-2 rounded-full" />
						<Skeleton className="w-2 h-2 rounded-full" />
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...Array(3)].map((_, i) => (
						<Skeleton key={i} className="w-full h-[300px] rounded-2xl" />
					))}
				</div>
			</div>

			{/* Main Grid Skeleton */}
			<div className="flex justify-between items-center mb-8">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-24" />
            </div>
			<div className='flex gap-[1rem] items-center flex-wrap w-full'>
				{[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
			</div>
		</div>
	)
}
