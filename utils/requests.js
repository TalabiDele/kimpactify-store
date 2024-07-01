async function fetchCategories(category) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/products/categories/${category}`
		)

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		console.log(error)
	}
}

async function fetchTitle(param) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/products/categories/title/${param}`
		)

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		console.log(error)
	}
}

async function fetchSubCategories(subCategory) {
	console.log(subCategory)

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/products/subCategories/${subCategory}`
		)

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		console.log(error)
	}
}

async function fetchSubCategoryTitle(param) {
	console.log(param)

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/products/subCategories/title/${param}`
		)

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		// console.log(res.json())

		return res.json()
	} catch (error) {
		console.log(error)
	}
}

export {
	fetchCategories,
	fetchTitle,
	fetchSubCategories,
	fetchSubCategoryTitle,
}
