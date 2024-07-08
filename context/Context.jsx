'use client'

import { createContext } from 'react'
import useLocalStorage from 'use-local-storage'

const Context = createContext()

export const Provider = ({ children }) => {
	const [cart, setCart] = useLocalStorage('cart', [])

	return (
		<Context.Provider
			value={{
				cart,
				setCart,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default Context
