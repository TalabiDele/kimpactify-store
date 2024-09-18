'use client'

import { createContext, useState } from 'react'
import useLocalStorage from 'use-local-storage'

const Context = createContext()

export const Provider = ({ children }) => {
	const [cart, setCart] = useLocalStorage('cart', [])
	const [loading, setLoading] = useState(true)
	const [isFetching, setIsFetching] = useState(false)

	return (
		<Context.Provider
			value={{
				cart,
				setCart,
				loading,
				setLoading,
				isFetching,
				setIsFetching,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default Context
