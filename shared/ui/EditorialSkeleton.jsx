import React from 'react'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'
import CardSkeleton from './CardSkeleton'

export const EditorialSkeleton = () => {
	return (
		<div className="w-full max-w-[1400px] mx-auto px-4 mt-12 mb-24">
            <div className="flex flex-col lg:flex-row gap-8 items-start relative">
                {/* Sticky Toolbar Skeleton */}
                <div className="w-full lg:w-1/4 sticky top-6 z-10 hidden lg:block">
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <Skeleton className="h-5 w-32 mb-6" />
                        <div className="flex flex-col gap-3">
                            <Skeleton className="h-10 w-full rounded-xl" />
                            <Skeleton className="h-10 w-full rounded-xl" />
                            <Skeleton className="h-10 w-full rounded-xl" />
                        </div>
                    </div>
                </div>

                {/* Main Content Grid Skeleton */}
                <div className="flex-1 w-full flex flex-col gap-8">
                    {/* Toolbar Skeleton for Mobile */}
                    <div className="flex lg:hidden justify-between items-center bg-white/80 backdrop-blur-md p-4 rounded-xl border border-slate-100 shadow-sm mb-4">
                         <Skeleton className="h-4 w-24" />
                         <Skeleton className="h-8 w-32 rounded-lg" />
                    </div>
                    
                    {/* Editorial Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {/* First 2 items double width */}
                        <Skeleton className="sm:col-span-2 lg:col-span-2 aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2/1] rounded-3xl" />
                        <Skeleton className="sm:col-span-2 lg:col-span-2 aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2/1] rounded-3xl" />

                        {/* Standard grid for the rest */}
                        {[...Array(6)].map((_, i) => (
                             <CardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
		</div>
	)
}
