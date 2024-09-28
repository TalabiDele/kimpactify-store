import React from 'react'
import { BtnWide } from './Buttons'
import { IoClose } from 'react-icons/io5'

const PayModal = ({
	name,
	setName,
	email,
	setEmail,
	amount,
	isPay,
	setIsPay,
}) => {
	const handlePay = (e) => {
		e.preventDefault()
	}

	return (
		<div
			className={` ${
				isPay ? 'w-[100vw] h-[100vh]' : 'w-0 h-0'
			} fixed top-0 left-0 right-0 bottom-0 bg-[#f7f7f7b9] flex justify-center items-center transition-all ease-in-out duration-75`}
		>
			<form
				className={`${
					isPay ? 'w-[30vw] opacity-[1]' : 'w-0 opacity-0'
				} bg-[#fff] rounded-md shadow-lg  mx-auto p-[1rem] transition-all ease-in-out duration-75 delay-150 relative`}
				onSubmit={handlePay}
			>
				<div
					className=' absolute right-[0.2rem] text-3xl top-[0.2rem] cursor-pointer'
					onClick={() => setIsPay(false)}
				>
					<IoClose />
				</div>
				<div
					className={` ${
						isPay ? 'block' : 'hidden'
					} transition-all ease-in-out duration-75 delay-200`}
				>
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
					<BtnWide text={'Proceed to pay'} />
				</div>
			</form>
		</div>
	)
}

export default PayModal
