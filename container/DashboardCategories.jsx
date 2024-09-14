'use client'

import React, { useState } from 'react'
import Heading from '/components/Heading'
import SearchInput from '/components/SearchInput'
import { BtnFill } from '/components/Buttons'
import { CategoryTable } from '../components/CategoryTable'

const DashboardCategories = ({ categories }) => {
	const [isAdd, setIsAdd] = useState(false)

	return (
		<div>
			<div className=''>
				<Heading text={'Categories'} />
			</div>
			<div className=' flex items-center justify-between mt-[4rem]'>
				<SearchInput placeholder={'product'} />
				<div className='' onClick={() => setIsAdd(true)}>
					<BtnFill text={'Add product'} />
				</div>
			</div>

			<CategoryTable categories={categories} />
		</div>
	)
}

export default DashboardCategories
