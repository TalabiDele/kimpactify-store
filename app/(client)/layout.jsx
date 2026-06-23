import '/assets/styles/globals.css'
import Navbar from '/widgets/Header/Navbar'
import Footer from '/widgets/Footer/Footer'
import { Provider } from '/shared/config/Context'
import { Toaster } from 'react-hot-toast'

export const metadata = {
	title: 'Kimpactify Store | Find your affordable wears.',
	description: 'Find your affordable wears',
	keywords: 'Clothing, african wears, styled clothing',
}

const layout = ({ children }) => {
	return (
		<Provider>
			<html lang='en'>
				<body>
					<div className='flex flex-col min-h-screen'>
						<Toaster />
						<Navbar />
						<main className='flex-grow'>{children}</main>
						<Footer />
					</div>
				</body>
			</html>
		</Provider>
	)
}

export default layout
