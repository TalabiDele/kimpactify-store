'use client'

import Context from '/context/Context'
import React, { useContext } from 'react'

const CategoriesPage = () => {
	const { categories } = useContext(Context)

	console.log(categories)

	return (
		<div>
			<div className=''></div>
		</div>
	)
}

export default CategoriesPage
