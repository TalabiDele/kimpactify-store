'use client'

import React, { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Country, State } from 'country-state-city'

const shippingDetailsSchema = z.object({
	name: z.string().min(1, { message: 'Full name is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
	countryCode: z.string().min(1, { message: 'Code required' }),
	number: z.string().min(10, { message: 'At least 10 digits' }),
	street: z.string().min(1, { message: 'Street address is required' }),
	city: z.string().min(1, { message: 'City is required' }),
	state: z.string().min(1, { message: 'State is required' }),
	zip: z.string().min(1, { message: 'ZIP is required' }),
	country: z.string().min(1, { message: 'Country is required' }),
})

const countryCodes = [
	{ code: '+1', label: 'US/CA (+1)' },
	{ code: '+44', label: 'UK (+44)' },
	{ code: '+61', label: 'AU (+61)' },
	{ code: '+91', label: 'IN (+91)' },
	{ code: '+234', label: 'NG (+234)' },
	{ code: '+49', label: 'DE (+49)' },
	{ code: '+33', label: 'FR (+33)' },
	{ code: '+81', label: 'JP (+81)' },
	{ code: '+86', label: 'CN (+86)' },
	{ code: '+55', label: 'BR (+55)' },
]

const PayModal = ({ setShippingDetails, setIsSave }) => {
	const [isSubmit, setIsSubmit] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(shippingDetailsSchema),
		defaultValues: {
			name: '',
			email: '',
			countryCode: '+1',
			number: '',
			street: '',
			city: '',
			state: '',
			zip: '',
			country: 'US',
		},
	})

	const watchedValues = watch()
	const selectedCountryIso = watch('country')
	
	const countries = Country.getAllCountries()
	const states = selectedCountryIso ? State.getStatesOfCountry(selectedCountryIso) : []

	const [lastCountry, setLastCountry] = useState(selectedCountryIso)

	useEffect(() => {
		// Only reset the state field if the country ACTUALLY changed
		if (selectedCountryIso !== lastCountry) {
			setValue('state', '')
			setLastCountry(selectedCountryIso)
		}
	}, [selectedCountryIso, lastCountry, setValue])

	const onSubmit = (data) => {
		const countryName = Country.getCountryByCode(data.country)?.name || data.country
		const stateName = states.find(s => s.isoCode === data.state)?.name || data.state

		const fullAddress = `${data.street}, ${data.city}, ${stateName} ${data.zip}, ${countryName}`
		const fullNumber = `${data.countryCode} ${data.number}`

		setShippingDetails({
			name: data.name,
			email: data.email,
			number: fullNumber,
			address: fullAddress,
		})
		setIsSubmit(true)
		setIsSave(true)
	}

	const handleChange = () => {
		setIsSubmit(false)
		setIsSave(false)
	}

	const renderStateName = states.find(s => s.isoCode === watchedValues.state)?.name || watchedValues.state
	const renderCountryName = Country.getCountryByCode(watchedValues.country)?.name || watchedValues.country

	return (
		<div className='bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm'>
			{isSubmit ? (
				<div className='flex justify-between items-start'>
					<div className='flex-1'>
						<h2 className='text-2xl font-bold text-slate-900 mb-4'>Shipping Details</h2>
						<div className='space-y-1 text-slate-700'>
							<div className='flex items-center gap-2'>
								<p className='font-bold text-lg text-slate-900'>{watchedValues.name}</p>
								<p className='text-slate-500 text-sm'>({watchedValues.countryCode} {watchedValues.number})</p>
							</div>
							<p className='font-medium text-slate-600'>{watchedValues.email}</p>
							<p className='text-slate-600'>{watchedValues.street}</p>
							<p className='text-slate-600'>{watchedValues.city}, {renderStateName} {watchedValues.zip}</p>
							<p className='text-slate-600'>{renderCountryName}</p>
						</div>
					</div>

					<button
						className='text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors mt-1'
						onClick={handleChange}
					>
						Edit
					</button>
				</div>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<h2 className='text-2xl font-bold text-slate-900 mb-6'>Shipping Details</h2>
					<div className='flex flex-col gap-6'>
						{/* Name & Email */}
						<div className='flex flex-col sm:flex-row gap-6'>
							<div className='flex flex-col flex-1 relative'>
								<label className='text-sm font-semibold text-slate-700 mb-2' htmlFor='name'>
									Full Name
								</label>
								<input
									type='text'
									id='name'
									placeholder='John Doe'
									className={`w-full border ${errors.name ? 'border-red-500' : 'border-slate-300'} font-medium rounded-xl p-3 bg-white text-sm outline-none focus:border-slate-900 transition-colors`}
									{...register('name')}
								/>
								{errors.name && <p className='text-red-500 text-xs mt-1 absolute -bottom-5'>{errors.name.message}</p>}
							</div>
							<div className='flex flex-col flex-1 relative'>
								<label className='text-sm font-semibold text-slate-700 mb-2' htmlFor='email'>
									Email
								</label>
								<input
									type='email'
									id='email'
									placeholder='johndoe@email.com'
									className={`w-full border ${errors.email ? 'border-red-500' : 'border-slate-300'} font-medium rounded-xl p-3 bg-white text-sm outline-none focus:border-slate-900 transition-colors`}
									{...register('email')}
								/>
								{errors.email && <p className='text-red-500 text-xs mt-1 absolute -bottom-5'>{errors.email.message}</p>}
							</div>
						</div>

						{/* Phone Number */}
						<div className='flex flex-col relative mt-2 sm:mt-0'>
							<label className='text-sm font-semibold text-slate-700 mb-2' htmlFor='number'>
								Phone Number
							</label>
							<div className='flex gap-2'>
								<div className='w-[140px]'>
									<select
										className={`w-full border ${errors.countryCode ? 'border-red-500' : 'border-slate-300'} font-medium rounded-xl p-3 bg-white text-sm outline-none focus:border-slate-900 transition-colors appearance-none cursor-pointer`}
										{...register('countryCode')}
									>
										{countryCodes.map((c) => (
											<option key={c.code} value={c.code}>{c.label}</option>
										))}
									</select>
								</div>
								<input
									type='tel'
									id='number'
									placeholder='234 567 8900'
									className={`flex-1 border ${errors.number ? 'border-red-500' : 'border-slate-300'} font-medium rounded-xl p-3 bg-white text-sm outline-none focus:border-slate-900 transition-colors`}
									{...register('number')}
								/>
							</div>
							{(errors.countryCode || errors.number) && (
								<p className='text-red-500 text-xs mt-1 absolute -bottom-5'>
									{errors.countryCode?.message || errors.number?.message}
								</p>
							)}
						</div>

						{/* Address Fields */}
						<div className='flex flex-col gap-6 mt-2 sm:mt-0'>
							<div className='flex flex-col flex-1 relative'>
								<label className='text-sm font-semibold text-slate-700 mb-2' htmlFor='street'>
									Street Address
								</label>
								<input
									type='text'
									id='street'
									placeholder='123 Main St, Apt 4B'
									className={`w-full border ${errors.street ? 'border-red-500' : 'border-slate-300'} font-medium rounded-xl p-3 bg-white text-sm outline-none focus:border-slate-900 transition-colors`}
									{...register('street')}
								/>
								{errors.street && <p className='text-red-500 text-xs mt-1 absolute -bottom-5'>{errors.street.message}</p>}
							</div>

							<div className='flex flex-col sm:flex-row gap-6'>
								<div className='flex flex-col flex-1 relative'>
									<label className='text-sm font-semibold text-slate-700 mb-2' htmlFor='city'>
										City
									</label>
									<input
										type='text'
										id='city'
										placeholder='San Francisco'
										className={`w-full border ${errors.city ? 'border-red-500' : 'border-slate-300'} font-medium rounded-xl p-3 bg-white text-sm outline-none focus:border-slate-900 transition-colors`}
										{...register('city')}
									/>
									{errors.city && <p className='text-red-500 text-xs mt-1 absolute -bottom-5'>{errors.city.message}</p>}
								</div>
								
								<div className='flex flex-col flex-1 relative'>
									<label className='text-sm font-semibold text-slate-700 mb-2' htmlFor='zip'>
										ZIP / Postal Code
									</label>
									<input
										type='text'
										id='zip'
										placeholder='94105'
										className={`w-full border ${errors.zip ? 'border-red-500' : 'border-slate-300'} font-medium rounded-xl p-3 bg-white text-sm outline-none focus:border-slate-900 transition-colors`}
										{...register('zip')}
									/>
									{errors.zip && <p className='text-red-500 text-xs mt-1 absolute -bottom-5'>{errors.zip.message}</p>}
								</div>
							</div>

							<div className='flex flex-col sm:flex-row gap-6'>
								<div className='flex flex-col flex-1 relative'>
									<label className='text-sm font-semibold text-slate-700 mb-2' htmlFor='country'>
										Country
									</label>
									<select
										id='country'
										className={`w-full border ${errors.country ? 'border-red-500' : 'border-slate-300'} font-medium rounded-xl p-3 bg-white text-sm outline-none focus:border-slate-900 transition-colors appearance-none cursor-pointer`}
										{...register('country')}
									>
										<option value="">Select Country</option>
										{countries.map(c => (
											<option key={c.isoCode} value={c.isoCode}>{c.name}</option>
										))}
									</select>
									{errors.country && <p className='text-red-500 text-xs mt-1 absolute -bottom-5'>{errors.country.message}</p>}
								</div>

								<div className='flex flex-col flex-1 relative'>
									<label className='text-sm font-semibold text-slate-700 mb-2' htmlFor='state'>
										State / Province
									</label>
									{states.length > 0 ? (
										<select
											id='state'
											className={`w-full border ${errors.state ? 'border-red-500' : 'border-slate-300'} font-medium rounded-xl p-3 bg-white text-sm outline-none focus:border-slate-900 transition-colors appearance-none cursor-pointer`}
											{...register('state')}
										>
											<option value="">Select State / Province</option>
											{states.map(s => (
												<option key={s.isoCode} value={s.isoCode}>{s.name}</option>
											))}
										</select>
									) : (
										<input
											type='text'
											id='state'
											placeholder='State / Province'
											className={`w-full border ${errors.state ? 'border-red-500' : 'border-slate-300'} font-medium rounded-xl p-3 bg-white text-sm outline-none focus:border-slate-900 transition-colors`}
											{...register('state')}
										/>
									)}
									{errors.state && <p className='text-red-500 text-xs mt-1 absolute -bottom-5'>{errors.state.message}</p>}
								</div>
							</div>
						</div>

						<div className='mt-8'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-slate-900/20 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
							>
								{isSubmitting ? 'Saving...' : 'Save Shipping Details'}
							</button>
						</div>
					</div>
				</form>
			)}
		</div>
	)
}

export default PayModal
