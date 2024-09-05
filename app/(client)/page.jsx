import Banner from '/components/Banner'
import AfricanWear from '/container/AfricanWear'
import CooperateWears from '/container/CooperateWears'
import KnitWears from '/container/KnitWears'

const HomePage = () => {
	return (
		<div className=' w-[90vw] mx-auto overflow-x-hidden'>
			<Banner />
			<AfricanWear />
			<CooperateWears />
			<KnitWears />
		</div>
	)
}

export default HomePage
