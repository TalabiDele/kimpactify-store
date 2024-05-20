import '../assets/styles/globals.css'
import Navbar from '../components/Navbar'

export const metadata = {
	title: 'Kimpactify Store | Find your affordable wears.',
	description: 'Find your affordable wears',
	keywords: 'Clothing, african wears, styled clothing',
}

const layout = ({ children }) => {
	return (
		<html lang='en'>
			<body>
				<div className=''>
					<Navbar />
					<main className=''>{children}</main>
				</div>
			</body>
		</html>
	)
}

export default layout
