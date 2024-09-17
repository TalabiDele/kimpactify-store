'use client'

import React, { useState } from 'react'
import Heading from '/components/Heading'
import SearchInput from '/components/SearchInput'
import { BtnFill } from '/components/Buttons'
import { CategoryTable } from '../components/CategoryTable'
import AddCategory from '../components/AddCategory'

const DashboardCategories = ({ categories }) => {
	const [isAdd, setIsAdd] = useState(false)

	return (
		<div>
			{isAdd && <AddCategory />}
			<div className=''>
				<Heading text={'Categories'} />
			</div>
			<div className=' flex items-center justify-between mt-[4rem]'>
				<SearchInput placeholder={'product'} />
				<div className='' onClick={() => setIsAdd(true)}>
					<BtnFill text={'Add category'} />
				</div>
			</div>

			<CategoryTable categories={categories} />
		</div>
	)
}

export default DashboardCategories
