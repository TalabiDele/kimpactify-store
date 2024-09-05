'use client'

import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

const SearchInput = ({ placeholder }) => {
	const [search, setSearch] = useState('')

	return (
		<div>
			<div className=' relative flex items-center '>
				<input
					type='text'
					placeholder={`Search ${placeholder}`}
					className=' bg-transparent py-[0.2rem] pl-[2rem] border border-gray-300 rounded-md'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div className=' absolute top-[0.4rem] bottom-0 left-[0.5rem] text-[1rem] text-gray-400'>
					<IoSearchSharp fontSize={20} />
				</div>
			</div>
		</div>
	)
}

export default SearchInput
