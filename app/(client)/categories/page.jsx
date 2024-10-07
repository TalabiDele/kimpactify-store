'use client'

import React, { useContext, useEffect } from 'react'
import Context from '/context/Context'
import CategoriesPage from '/container/CategoriesPage'

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
