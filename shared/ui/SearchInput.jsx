'use client'

import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

const SearchInput = ({ placeholder, value, onChange }) => {
	const [localSearch, setLocalSearch] = useState('')
	
	const isControlled = value !== undefined && onChange !== undefined
	const currentValue = isControlled ? value : localSearch
	const handleChange = (e) => {
		if (isControlled) {
			onChange(e.target.value)
		} else {
			setLocalSearch(e.target.value)
		}
	}

	return (
		<div className="relative flex items-center w-full sm:w-[300px]">
			<input
				type='text'
				placeholder={`Search ${placeholder}...`}
				className='w-full bg-white py-2.5 pl-10 pr-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ffd138] focus:border-[#ffd138] outline-none transition-all text-sm font-medium text-slate-700 shadow-sm'
				value={currentValue}
				onChange={handleChange}
			/>
			<div className='absolute left-3 text-slate-400'>
				<IoSearchSharp fontSize={18} />
			</div>
		</div>
	)
}

export default SearchInput
