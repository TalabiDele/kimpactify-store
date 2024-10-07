'use client'

import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Confirmation from '/components/Confirmation'
import { useParams } from 'next/navigation'
import Context from '/context/Context'
import { fetchOrder } from '/utils/requests'

const ConfirmationPage = () => {
	const [order, setOrder] = useState()

	const { setLoading } = useContext(Context)
	const { orderId } = useParams()

	useEffect(() => {
		const fetchConfirmOrder = async () => {
			if (!orderId) return

			try {
				const resOrder = await fetchOrder(orderId)
				setOrder(resOrder[0])

				//(resOrder)
			} catch (error) {
				console.error('Error fetching order', error)
			} finally {
				setLoading(false)
			}
		}

		fetchConfirmOrder()
	}, [])

	return (
		<div>
			<Confirmation order={order} />
		</div>
	)
}

export default ConfirmationPage
