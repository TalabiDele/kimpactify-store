import '/assets/styles/globals.css'
import { Provider } from '/context/Context'

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
						<main className=''>{children}</main>
					</div>
				</body>
			</html>
		</Provider>
	)
}

export default layout
