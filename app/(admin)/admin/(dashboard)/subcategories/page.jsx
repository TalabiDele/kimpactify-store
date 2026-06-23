import React from 'react'
import connectDB from '/config/database'
import SubCategory from '/models/SubCategories'
import Category from '/models/Categories'
import Product from '/models/Products'
import DashboardSubCategories from '/widgets/Admin/DashboardSubCategories'

export const dynamic = 'force-dynamic';

const SubCategoriesPage = async () => {
	await connectDB()

	// Fetch subcategories, populate parent category and linked products
	const subCategories = await SubCategory.find({})
		.populate('category', 'title param')
		.populate('products', 'title pricing image')
		.lean()

	// JSON round-trip is the safest way to deep-serialize all Mongoose ObjectIds
	// (handles nested _id fields, Date objects, etc. in one pass)
	const safeSubCategories = JSON.parse(JSON.stringify(subCategories))

	return (
		<div className="w-full">
			<DashboardSubCategories subCategories={safeSubCategories} />
		</div>
	)
}

export default SubCategoriesPage
