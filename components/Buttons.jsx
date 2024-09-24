import React from 'react'

export const BtnPrimary = ({ text }) => {
	return (
		<div>
			<button className=' bg-[#1E65FF] text-white rounded-3xl py-[0.5rem] px-[2rem] text-[0.8rem]'>
				{text}
			</button>
		</div>
	)
}

export const BtnSecondary = ({ text }) => {
	return (
		<div>
			<button className=' bg-[#333333] text-white rounded-3xl py-[0.5rem] px-[2rem] text-[0.8rem]'>
				{text}
			</button>
		</div>
	)
}

export const BtnCard = ({ text }) => {
	return (
		<div>
			<button className=' bg-none border border-[#1E65FF] rounded-md text-[#1E65FF] py-[0.3rem] px-[1rem] text-[0.8rem] flex gap-1 font-medium items-center'>
				{text}
			</button>
		</div>
	)
}

export const BtnFill = ({ text }) => {
	return (
		<div>
			<button className=' bg-[#1E65FF] border border-[#1E65FF] rounded-md text-[#fff] py-[0.7rem] px-[5rem] text-[1rem] font-medium max-xl:px-[3rem] max-lg:px-[1rem] max-md:px-[4rem] max-sm:px-[1rem]'>
				{text}
			</button>
		</div>
	)
}

export const BtnStroke = ({ text, icon }) => {
	return (
		<div>
			<button className=' bg-transparent border border-[#1E65FF] rounded-md text-[#1E65FF] py-[0.7rem] px-[5rem] text-[1rem] font-medium flex gap-1 items-center max-xl:px-[3rem] max-lg:px-[1rem] max-md:px-[4rem] max-sm:px-[1rem]'>
				{text} {icon}
			</button>
		</div>
	)
}

export const BtnWide = ({ text }) => {
	return (
		<div>
			<button className=' bg-[#1E65FF] border border-[#1E65FF] rounded-md text-[#fff] py-[0.3rem] px-[1rem] text-[0.8rem] font-medium w-full'>
				{text}
			</button>
		</div>
	)
}

export const BtnCancel = ({ text }) => {
	return (
		<div>
			<div className=' cursor-pointer bg-gray-300 border rounded-md text-[#000] py-[0.6rem] px-[1rem] text-[0.8rem] font-medium w-full'>
				{text}
			</div>
		</div>
	)
}

export const BtnDelete = ({ text }) => {
	return (
		<div>
			<button className=' bg-red-600 border rounded-md text-[#fff] py-[0.6rem] px-[1rem] text-[0.8rem] font-medium w-full'>
				{text}
			</button>
		</div>
	)
}
