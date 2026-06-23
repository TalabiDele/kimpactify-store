import React from 'react'
import connectDB from '/config/database'
import Order from '/models/Orders'
import DashboardOrders from '/widgets/Admin/DashboardOrders'

export const dynamic = 'force-dynamic';

const OrdersPage = async () => {
	await connectDB()

	// Fetch all orders sorted by newest first
	const orders = await Order.find({}).sort({ createdAt: -1 }).lean()

	// Serialize ObjectIds for Client Component
	const safeOrders = orders.map(o => ({
		...o,
		_id: o._id.toString(),
		createdAt: o.createdAt ? new Date(o.createdAt).toISOString() : new Date().toISOString(),
		updatedAt: o.updatedAt ? new Date(o.updatedAt).toISOString() : new Date().toISOString(),
		// ensure products array objects also have string IDs
		products: o.products ? o.products.map(p => ({
			...p,
			_id: p._id ? p._id.toString() : undefined
		})) : []
	}))

	return (
		<div className="w-full">
			<DashboardOrders orders={safeOrders} />
		</div>
	)
}

export default OrdersPage
