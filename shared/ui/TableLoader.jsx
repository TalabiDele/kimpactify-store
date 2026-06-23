'use client'

import { useContext, useState } from 'react'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '/shared/ui/shadcn/components/ui/table'
import { LuMoreHorizontal } from 'react-icons/lu'
import EditProductModal from '/features/Admin/EditProductModal'
import AddProduct from '/features/Admin/AddProduct'
import { MdOutlineDelete } from 'react-icons/md'
import DeleteProduct from '/features/Admin/DeleteProductModal'
import Context from '/shared/config/Context'
import { Skeleton } from '/shared/ui/shadcn/components/ui/skeleton'

export function TableLoader() {
	return (
		<div className=' mt-[1rem] bg-white rounded-md h-[70vh] overflow-y-scroll border-none'>
			<Table className=''>
				<TableHeader>
					<TableRow>
						<TableHead className=''>
							<Skeleton className='h-4 w-[60px]' />
						</TableHead>
						<TableHead>
							<Skeleton className='h-4 w-[60px]' />
						</TableHead>
						<TableHead>
							<Skeleton className='h-4 w-[60px]' />
						</TableHead>
						<TableHead className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableHead>
						<TableHead className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableHead>

						<TableHead className='text-right'></TableHead>
						<TableHead className='text-right'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow className=' font-medium'>
						<TableCell className='font-medium'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>

						<TableCell className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className='text-right '>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className=' '>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
					</TableRow>
					<TableRow className=' font-medium'>
						<TableCell className='font-medium'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>

						<TableCell className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className='text-right '>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className=' '>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
					</TableRow>
					<TableRow className=' font-medium'>
						<TableCell className='font-medium'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>

						<TableCell className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className='text-right '>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className=' '>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
					</TableRow>
					<TableRow className=' font-medium'>
						<TableCell className='font-medium'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>

						<TableCell className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className='text-right '>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className=' '>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
					</TableRow>
					<TableRow className=' font-medium'>
						<TableCell className='font-medium'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>

						<TableCell className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className='text-right'>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className='text-right '>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
						<TableCell className=' '>
							<Skeleton className='h-4 w-[60px]' />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}
