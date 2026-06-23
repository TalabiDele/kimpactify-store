async function fetchCategories(category) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/products/categories/${category}`
		, { cache: 'no-store' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		//(error)
	}
}

async function fetchTitle(param) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/products/categories/title/${param}`
		, { cache: 'no-store' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		//(error)
	}
}

async function fetchSubCategories(subCategory) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/products/subCategories/${subCategory}`
		, { cache: 'no-store' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		//(error)
	}
}

async function fetchSubCategoryTitle(param) {
	// //(param)

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/products/subCategories/title/${param}`
		, { cache: 'no-store' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		//(error)
	}
}

async function fetchCategoryTitle(param) {
	//(param)

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/categories/${param}`
		, { cache: 'no-store' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		//(error)
	}
}

async function fetchProduct(param) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/products/${param}`
		, { cache: 'no-store' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		//(error)
	}
}

async function fetchOrder(param) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/orders/${param}`
		, { cache: 'no-store' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		//(error)
	}
}

async function fetchAllProducts() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/allProducts`, { cache: 'no-store' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		//(error)
	}
}

async function fetchAllCategories() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/categories`, { cache: 'no-store' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		//(error)
	}
}

async function fetchAllSubCategories() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/subCategories`
		, { cache: 'no-store' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		//(error)
	}
}

async function editProduct(request) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/subCategories`
		, { cache: 'no-store' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		//(error)
	}
}

export {
	fetchCategories,
	fetchTitle,
	fetchSubCategories,
	fetchSubCategoryTitle,
	fetchCategoryTitle,
	fetchProduct,
	fetchAllProducts,
	fetchAllSubCategories,
	fetchAllCategories,
	fetchOrder,
}
