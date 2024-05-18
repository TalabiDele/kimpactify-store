import '@/assets/styles/globals.css'

export const metadata = {
	title: 'Kimpactify Store | Find your affordable wears.',
	description: 'Find your affordable wears',
	keywords: 'Clothing, african wears, styled clothing',
}

const layout = ({ children }) => {
	return (
		<html lang='en'>
			<body>
				<div>
					<div className=''>{children}</div>
				</div>
			</body>
		</html>
	)
}

export default layout
