import '../assets/styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategeoryNav from '../components/CategoryNav'
import { Provider } from '../context/Context'
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
					<div className=''>
						<Toaster />
						<Navbar />

						<main className=''>{children}</main>
						<Footer />
					</div>
				</body>
			</html>
		</Provider>
	)
}

export default layout
