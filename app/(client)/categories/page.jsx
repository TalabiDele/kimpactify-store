'use client'

import React, { useContext, useEffect } from 'react'
import Context from '/shared/config/Context'
import CategoriesPage from '/widgets/CategoryGrid/CategoriesPage'

const page = () => {
	const { fetchCategories } = useContext(Context)

	useEffect(() => {
		fetchCategories()
	}, [])

	return (
		<div>
			<CategoriesPage />
		</div>
	)
}

export default page
