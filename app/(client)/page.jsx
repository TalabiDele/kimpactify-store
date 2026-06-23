import Banner from '/widgets/Banner/Banner'
import AfricanWear from '/widgets/ProductShowcase/AfricanWear'
import CooperateWears from '/widgets/ProductShowcase/CooperateWears'
import KnitWears from '/widgets/ProductShowcase/KnitWears'
import { fetchCategories } from '/shared/api/requests'
import HomeDiscoverCard from '/features/CategoryNavigation/HomeDiscoverCard'
import TopPicks from '/widgets/ProductShowcase/TopPicks'

const HomePage = async () => {
	let africanWears = null
	let corporateWears = null
	let knitWear = null

	try {
		// Fetch all categories concurrently for maximum speed
		const [africanRes, corporateRes, knitRes] = await Promise.all([
			fetchCategories('african-wears'),
			fetchCategories('corporate-wears'),
			fetchCategories('knit-wears')
		])
		
		africanWears = africanRes
		corporateWears = corporateRes
		knitWear = knitRes
	} catch (error) {
		console.error('Error fetching products for SSR', error)
	}

	const allProducts = [...(africanWears || []), ...(corporateWears || []), ...(knitWear || [])]

	return (
		<div className=' w-[95vw] max-sm:w-[90vw] mx-auto overflow-x-hidden mb-24'>
			<Banner
				heading={'Elevate Your Style with Timeless Fashion'}
				text={
					'Discover curated collections of luxurious fabrics, bold designs, and the season’s must-haves. Define your look with effortless elegance, from statement pieces to wardrobe essentials'
				}
			/>
			
			<div className='mt-20 flex flex-col lg:flex-row gap-12 items-start relative'>
				<HomeDiscoverCard />
				
				<div className='flex-1 flex flex-col gap-12 overflow-hidden w-full'>
					<TopPicks products={allProducts} />
					<AfricanWear africanWears={africanWears} />
					<CooperateWears corporateWears={corporateWears} />
					<KnitWears knitWear={knitWear} />
				</div>
			</div>
		</div>
	)
}

export default HomePage
