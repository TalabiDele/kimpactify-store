import '/assets/styles/globals.css'
import { Provider } from '/context/Context'
import { auth } from '/auth'
import { redirect } from 'next/navigation'
import SideNav from '/components/SideNav'

export const metadata = {
	title: 'Kimpactify Store | Find your affordable wears.',
	description: 'Find your affordable wears',
	keywords: 'Clothing, african wears, styled clothing',
}

const DashboardLayout = async ({ children }) => {
	const session = await auth()

	if (!session?.user) redirect('/admin/auth/login')

	return (
		<Provider>
			<html lang='en'>
				<body>
					<main className=''>
						<div className=' bg-[#F1EDED] flex items-start gap-5 fixed right-0 left-0 top-0 bottom-0'>
							<SideNav />
							<div className=' my-[2rem] w-full px-[2rem]'>{children}</div>
						</div>
					</main>
				</body>
			</html>
		</Provider>
	)
}

export default DashboardLayout
