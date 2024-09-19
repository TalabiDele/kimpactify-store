'use client'

import { createContext, useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import { fetchAllCategories, fetchAllProducts } from '../utils/requests'

const Context = createContext()

export const Provider = ({ children }) => {
	const [cart, setCart] = useLocalStorage('cart', [])
	const [loading, setLoading] = useState(true)
	const [isFetching, setIsFetching] = useState(false)
	const [productItem, setProductItem] = useState()
	const [categories, setCategories] = useState()

	// useEffect(() => {
	// 	fetchProducts()
	// 	fetchCategories()
	// }, [])

	const fetchProducts = async () => {
		try {
			const resProduct = await fetchAllProducts()

			console.log(resProduct)

			setProductItem(resProduct)
		} catch (error) {
			console.error('Error fetching products', error)
		} finally {
			setLoading(false)
		}
	}

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

	return (
		<Context.Provider
			value={{
				cart,
				setCart,
				loading,
				setLoading,
				isFetching,
				setIsFetching,
				productItem,
				setProductItem,
				fetchCategories,
				fetchProducts,
				categories,
				setCategories,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default Context
