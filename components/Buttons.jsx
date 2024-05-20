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
			<button className=' bg-none border border-[#1E65FF] rounded-md text-[#1E65FF] py-[0.3rem] px-[1rem] text-[0.8rem]'>
				{text}
			</button>
		</div>
	)
}
