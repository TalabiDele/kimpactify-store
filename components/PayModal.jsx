'use client'

import React, { useState } from 'react'
import { BtnWide } from './Buttons'
import { IoClose } from 'react-icons/io5'
import { z } from 'zod'

const shippingDetailsSchema = z.object({
	name: z.string().min(1, { message: 'Full name is required' }), // Validates non-empty string
	email: z.string().email({ message: 'Invalid email address' }), // Validates proper email format
	number: z
		.string()
		.min(10, { message: 'Phone number must be at least 10 digits' }), // Basic phone number validation
	address: z.string().min(1, { message: 'Address is required' }), // Non-empty string for address
})

const PayModal = ({ setShippingDetails, setIsSave }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [number, setNumber] = useState('')
	const [address, setAddress] = useState()
	const [isSubmit, setIsSubmit] = useState(false)
	const [nameError, setNameError] = useState('')
	const [emailError, setEmailError] = useState('')
	const [addressError, setAddressError] = useState('')
	const [numberError, setNumberError] = useState('')

	const handlePay = (e) => {
		e.preventDefault()

		const formData = {
			name,
			email,
			number,
			address,
		}

		const validationResult = shippingDetailsSchema.safeParse(formData)

		if (!validationResult.success) {
			// Handle validation errors
			//(validationResult.error.format())
			const errors = validationResult.error.format()

			if (errors?.name?._errors) {
				setNameError(errors.name._errors)
			} else {
				setNameError('')
			}

			if (errors?.email?._errors) {
				setEmailError(errors.email._errors)
			} else {
				setEmailError('')
			}

			if (errors?.number?._errors) {
				setNumberError(errors.number._errors)
			} else {
				setNumberError('')
			}

			if (errors?.address?._errors) {
				setAddressError(errors.address._errors)
			} else {
				setAddressError('')
			}
		} else {
			// Proceed with form submission (valid data)
			//('Form data is valid:', validationResult.data)
			setShippingDetails({
				name,
				email,
				number,
				address,
			})

			setNameError('')
			setEmailError('')
			setNumberError('')
			setAddressError('')

			setIsSubmit(true)
			setIsSave(true)
		}
	}

	const handleChange = () => {
		setIsSubmit(false)
		setIsSave(false)
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
						<div className='flex gap-4'>
							<div className=' flex flex-col mb-[1rem] relative w-[50%]'>
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
								<p className=' text-red-500 text-[0.8rem] mt-[0.3rem]'>
									{nameError}
								</p>
							</div>
							<div className=' flex flex-col mb-[1rem] relative w-[50%]'>
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
								<p className=' text-red-500 text-[0.8rem] mt-[0.3rem]'>
									{emailError}
								</p>
							</div>
						</div>

						<div className='flex gap-4'>
							<div className=' flex flex-col mb-[1rem] relative w-[50%]'>
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
								<p className=' text-red-500 text-[0.8rem] mt-[0.3rem]'>
									{numberError}
								</p>
							</div>
							<div className=' flex flex-col mb-[1rem] relative w-[50%]'>
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
								<p className=' text-red-500 text-[0.8rem] mt-[0.3rem]'>
									{addressError}
								</p>
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
