import React, { Suspense } from 'react'
import ProductsFilterContainer from '/features/ProductFilter/ProductsFilterContainer'
import { fetchAllProducts } from '/shared/api/requests'
import { ProductsSkeleton } from '/shared/ui/ProductsSkeleton'

const ProductPage = async () => {
	let products = null

	try {
		products = await fetchAllProducts()
	} catch (error) {
		console.error('Error fetching all products for SSR', error)
	}

	return (
		<div>
			<Suspense fallback={<ProductsSkeleton />}>
				<ProductsFilterContainer initialProducts={products} />
			</Suspense>
		</div>
	)
}

export default ProductPage
