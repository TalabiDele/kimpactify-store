'use client'

import React, { useEffect, useState } from 'react'
import DashboardCategories from '/container/DashboardCategories'
import { fetchAllCategories } from '/utils/requests'

const AdminCategories = () => {
	const [categories, setCategories] = useState()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const resCategories = await fetchAllCategories()

				console.log(resCategories)

				setCategories(resCategories)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}
		}

		fetchCategories()
	}, [])

	return (
		<div>
			<DashboardCategories categories={categories} />
		</div>
	)
}

export default AdminCategories
