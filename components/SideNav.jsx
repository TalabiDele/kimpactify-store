import React from 'react'
import { MdSpaceDashboard } from 'react-icons/md'
import { RiBox3Fill } from 'react-icons/ri'
import { BiSolidCategoryAlt } from 'react-icons/bi'
import { FaMoneyCheck } from 'react-icons/fa6'
import { MdCategory } from 'react-icons/md'
import Link from 'next/link'
import logo from '../assets/imgs/kimptrendz-logo.png'
import Image from 'next/image'
import { doLogout } from '/app/actions'
import { MdLogout } from 'react-icons/md'
import { IoHome } from 'react-icons/io5'

const SideNav = () => {
	const navItems = [
		{
			name: 'Dashboard',
			link: '/admin/dashboard',
			icon: <IoHome />,
		},
		{
			name: 'Products',
			link: '/admin/products',
			icon: <RiBox3Fill />,
		},
		{
			name: 'Categories',
			link: '/admin/categories',
			icon: <BiSolidCategoryAlt />,
		},
		{
			name: 'Sub Categories',
			link: '/admin/subcategories',
			icon: <MdCategory />,
		},
		{
			name: 'Transactions',
			link: '/admin/transactions',
			icon: <FaMoneyCheck />,
		},
	]

	return (
		<div>
			<div className='border-r border-gray-200 w-[13rem] h-[100vh] p-[1rem] flex flex-col justify-between bg-[#fff] '>
				<ul className=' flex flex-col gap-2 font-medium'>
					<Image
						src={logo}
						alt=''
						height={70}
						width={70}
						className=' mb-[3rem]'
						// objectFit='contain'
					/>
					{navItems.map((nav, index) => (
						<li className='' key={index}>
							<Link
								href={nav.link}
								className=' flex items-center gap-2 text-gray-600 p-[0.5rem] hover:bg-[#F1EDED] rounded-md'
							>
								{nav.icon}
								{nav.name}
							</Link>
						</li>
					))}
				</ul>
				<form action={doLogout} className=' p-[0.5rem]'>
					<button
						type='submit'
						className=' flex gap-2 items-center text-red-700 hover:bg-gray-50 rounded-md p-[0.5rem]'
					>
						<MdLogout /> Logout
					</button>
				</form>
			</div>
		</div>
	)
}

export default SideNav
