import React from 'react'
import connectDB from '/config/database'
import Order from '/models/Orders'
import Product from '/models/Products'
import DashboardAnalytics from '/features/Admin/DashboardAnalytics'
import moment from 'moment'

export const dynamic = 'force-dynamic';

const page = async () => {
	await connectDB()

	// Use lean() for better performance when fetching Mongoose documents for read-only Server Components
	const orders = await Order.find({}).lean()
	const products = await Product.find({}).lean()

	// 1. Key Metrics Calculation
	const totalOrders = orders.length
	const totalProducts = products.length

	// Calculate revenue excluding cancelled orders
	const validOrders = orders.filter(o => o.deliveryStatus !== 'Cancelled' && o.orderStatus !== 'Cancelled')
	const totalRevenue = validOrders.reduce((acc, order) => acc + (order.amount || 0), 0)

	const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0

	// 2. Recent Orders (Sort by latest)
	const recentOrders = [...orders]
		.sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()))
		.slice(0, 5)

	// 3. Chart Data: Revenue Over Time (Aggregate valid orders by date)
	const sortedValidOrders = [...validOrders].sort((a, b) => new Date(a.createdAt || Date.now()) - new Date(b.createdAt || Date.now()))
	const tempMap = {}
	sortedValidOrders.forEach(order => {
		const dateStr = moment(order.createdAt || Date.now()).format('MMM DD')
		tempMap[dateStr] = (tempMap[dateStr] || 0) + (order.amount || 0)
	})
	
	const revenueData = []
	for (const [date, rev] of Object.entries(tempMap)) {
		revenueData.push({ date, revenue: rev })
	}

	// 4. Chart Data: Orders by Status
	const statusMap = {}
	orders.forEach(o => {
		const status = o.deliveryStatus || 'Pending'
		statusMap[status] = (statusMap[status] || 0) + 1
	})
	
	const statusData = Object.keys(statusMap).map(key => ({
		name: key,
		value: statusMap[key]
	}))

	const metrics = {
		totalOrders,
		totalProducts,
		totalRevenue,
		averageOrderValue
	}

	// Safely serialize ObjectIds for client component props
	const safeRecentOrders = recentOrders.map(o => ({
		_id: o._id.toString(),
		name: o.name,
		email: o.email,
		amount: o.amount,
		status: o.deliveryStatus,
		date: moment(o.createdAt).format('MMM DD, YYYY')
	}))

	return (
		<div className="w-full mt-4">
			<DashboardAnalytics 
				metrics={metrics} 
				revenueData={revenueData} 
				statusData={statusData} 
				recentOrders={safeRecentOrders} 
			/>
		</div>
	)
}

export default page
