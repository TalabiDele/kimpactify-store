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
} from '/components/shadcn/components/ui/table'
import { LuMoreHorizontal } from 'react-icons/lu'
import EditProductModal from './EditProductModal'
import AddProduct from './AddProduct'
import { MdOutlineDelete } from 'react-icons/md'
import DeleteProduct from './DeleteProductModal'
import Context from '/context/Context'
import { Skeleton } from '/components/shadcn/components/ui/skeleton'

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
