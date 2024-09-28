'use client'

import React, { useState } from 'react'
import { BtnWide } from './Buttons'
import { IoClose } from 'react-icons/io5'

const PayModal = ({ setShippingDetails }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [number, setNumber] = useState('')
	const [address, setAddress] = useState()
	const [isSubmit, setIsSubmit] = useState(false)

	const handlePay = (e) => {
		e.preventDefault()

		setShippingDetails({
			name,
			email,
			number,
			address,
		})

		setIsSubmit(true)
	}

	const handleChange = () => {
		setIsSubmit(false)
	}

	return (
		<div>
			{isSubmit ? (
				<div className=' mb-[2rem] flex justify-between items-center'>
					<div className=' w-[70%]'>
						<div className='flex gap-3 items-center'>
							<p className=' font-bold text-lg'>{name}</p>
							<p className=''>{number}</p>
						</div>
						<p className=' font-medium text-gray-500'>{email}</p>
						<p className=' text-gray-500'>{address}</p>
					</div>

					<p
						className=' cursor-pointer text-blue-700 underline'
						onClick={handleChange}
					>
						Change
					</p>
				</div>
			) : (
				<form
					className={` opacity-[1] bg-[#fff] rounded-md p-[1rem] relative border mb-[2rem]`}
					onSubmit={handlePay}
				>
					<h1 className=' font-bold text-lg mb-[1rem]'>Shipping details</h1>
					<div
						className={`block transition-all ease-in-out duration-75 delay-200`}
					>
						<div className='flex items-center gap-4'>
							<div className=' flex flex-col mb-[1rem]'>
								<label className=' text-sm mb-[0.2rem]' htmlFor='name'>
									Full name
								</label>
								<input
									type='text'
									id='name'
									name='name'
									value={name}
									placeholder='John Doe'
									className=' border border-[#DFE2E6] font-medium rounded-md p-[0.5rem] bg-[#F5F6F7] text-sm'
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className=' flex flex-col mb-[1rem]'>
								<label className=' text-sm mb-[0.2rem]' htmlFor='email'>
									Email
								</label>
								<input
									type='email'
									id='email'
									name='email'
									placeholder='johndoe@email.com'
									value={email}
									className=' border border-[#DFE2E6] font-medium rounded-md p-[0.5rem] bg-[#F5F6F7] text-sm'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div className='flex items-center gap-4'>
							<div className=' flex flex-col mb-[1rem]'>
								<label className=' text-sm mb-[0.2rem]' htmlFor='name'>
									Phone number
								</label>
								<input
									type='number'
									id='number'
									name='number'
									value={number}
									placeholder=''
									className=' border border-[#DFE2E6] font-medium rounded-md p-[0.5rem] bg-[#F5F6F7] text-sm'
									onChange={(e) => setNumber(e.target.value)}
								/>
							</div>
							<div className=' flex flex-col mb-[1rem]'>
								<label className=' text-sm mb-[0.2rem]' htmlFor='name'>
									Address
								</label>
								<input
									type='text'
									id='address'
									name='address'
									value={address}
									placeholder=''
									className=' border border-[#DFE2E6] font-medium rounded-md p-[0.5rem] bg-[#F5F6F7] text-sm'
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>
						</div>

						<BtnWide text={'Save'} />
					</div>
				</form>
			)}
		</div>
	)
}

export default PayModal
