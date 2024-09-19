'use client'

import { useContext, useEffect, useState } from 'react'
import Banner from '/components/Banner'
import AfricanWear from '/container/AfricanWear'
import CooperateWears from '/container/CooperateWears'
import KnitWears from '/container/KnitWears'
import { fetchCategories } from '/utils/requests'
import Context from '/context/Context'

const HomePage = () => {
	const [africanWears, setAfricanWears] = useState()
	const [corporateWears, setCorporateWears] = useState()
	const [knitWear, setKnitWear] = useState()

	const { setLoading } = useContext(Context)

	useEffect(() => {
		const fetchAllCategories = async () => {
			try {
				const africanCategory = await fetchCategories('african-wears')

				const corporateCategory = await fetchCategories('corporate-wears')

				const fetchKnitCategory = await fetchCategories('knit-wears')

				setAfricanWears(africanCategory)

				setCorporateWears(corporateCategory)

				setKnitWear(fetchKnitCategory)

				console.log(africanCategory)
			} catch (error) {
				console.error('Error fetching products', error)
			} finally {
				setLoading(false)
			}

			// if(products === null) {

			// }
		}

		fetchAllCategories()
	}, [])

	return (
		<div className=' w-[95vw] max-sm:w-[90vw] mx-auto overflow-x-hidden'>
			<Banner />
			<AfricanWear africanWears={africanWears} />
			<CooperateWears corporateWears={corporateWears} />
			<KnitWears knitWear={knitWear} />
		</div>
	)
}

export default HomePage
