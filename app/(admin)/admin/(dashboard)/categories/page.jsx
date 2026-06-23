'use client'

import React, { useContext, useEffect, useState } from 'react'
import DashboardCategories from '/widgets/Admin/DashboardCategories'
import { fetchAllCategories } from '/shared/api/requests'
import Context from '/shared/config/Context'

const AdminCategories = () => {
	const [categories, setCategories] = useState()

	const { loading, setLoading } = useContext(Context)

	useEffect(() => {
		setLoading(true)

		const fetchCategories = async () => {
			try {
				const resCategories = await fetchAllCategories()

				//(resCategories)

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
