'use client'

import React from 'react'
import {
	AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
	PieChart, Pie, Cell, Legend
} from 'recharts'
import { DollarSign, Package, ShoppingBag, TrendingUp } from 'lucide-react'

const COLORS = ['#ffd138', '#334155', '#94a3b8', '#10b981', '#ef4444', '#f59e0b']

const StatCard = ({ title, value, icon: Icon, subtext }) => (
	<div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
		<div className="flex justify-between items-start mb-4">
			<div>
				<p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</p>
				<h3 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">{value}</h3>
			</div>
			<div className="p-3 bg-slate-50 rounded-xl text-slate-700">
				<Icon size={24} />
			</div>
		</div>
		{subtext && <p className="text-sm font-medium text-slate-400">{subtext}</p>}
	</div>
)

const DashboardAnalytics = ({ metrics, revenueData, statusData, recentOrders }) => {
	const formattedRevenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(metrics.totalRevenue || 0)
	const formattedAOV = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(metrics.averageOrderValue || 0)

	// Custom tooltip for AreaChart
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100">
					<p className="font-bold text-slate-500 mb-1">{label}</p>
					<p className="text-lg font-extrabold text-slate-900">
						${payload[0].value.toFixed(2)}
					</p>
				</div>
			)
		}
		return null
	}

	return (
		<div className="w-full pb-10">
			<div className="mb-8">
				<h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
				<p className="text-sm font-medium text-slate-500 mt-1">Track your store's performance and orders.</p>
			</div>

			{/* Top Metric Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<StatCard 
					title="Total Revenue" 
					value={formattedRevenue} 
					icon={DollarSign} 
					subtext="From completed & pending orders" 
				/>
				<StatCard 
					title="Total Orders" 
					value={metrics.totalOrders} 
					icon={ShoppingBag} 
					subtext="Lifetime total orders" 
				/>
				<StatCard 
					title="Avg. Order Value" 
					value={formattedAOV} 
					icon={TrendingUp} 
					subtext="Revenue / Total Orders" 
				/>
				<StatCard 
					title="Total Products" 
					value={metrics.totalProducts} 
					icon={Package} 
					subtext="Active items in inventory" 
				/>
			</div>

			{/* Charts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				{/* Revenue Area Chart */}
				<div className="bg-white p-6 rounded-2xl border border-slate-200 lg:col-span-2">
					<h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Revenue Over Time</h3>
					<div className="w-full h-[300px]">
						{revenueData.length > 0 ? (
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
									<defs>
										<linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#ffd138" stopOpacity={0.4}/>
											<stop offset="95%" stopColor="#ffd138" stopOpacity={0}/>
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
									<XAxis 
										dataKey="date" 
										axisLine={false} 
										tickLine={false} 
										tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
										dy={10}
									/>
									<YAxis 
										axisLine={false} 
										tickLine={false} 
										tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
										tickFormatter={(val) => `$${val}`}
									/>
									<Tooltip content={<CustomTooltip />} />
									<Area 
										type="monotone" 
										dataKey="revenue" 
										stroke="#eab308" 
										strokeWidth={3}
										fillOpacity={1} 
										fill="url(#colorRev)" 
										activeDot={{ r: 6, fill: "#eab308", stroke: "#fff", strokeWidth: 2 }}
									/>
								</AreaChart>
							</ResponsiveContainer>
						) : (
							<div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">
								No revenue data available
							</div>
						)}
					</div>
				</div>

				{/* Order Status Pie Chart */}
				<div className="bg-white p-6 rounded-2xl border border-slate-200">
					<h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Orders by Status</h3>
					<div className="w-full h-[300px]">
						{statusData.length > 0 ? (
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={statusData}
										cx="50%"
										cy="45%"
										innerRadius={60}
										outerRadius={80}
										paddingAngle={5}
										dataKey="value"
										stroke="none"
									>
										{statusData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
										))}
									</Pie>
									<Tooltip 
										contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontWeight: 'bold' }}
										itemStyle={{ color: '#0f172a' }}
									/>
									<Legend 
										verticalAlign="bottom" 
										height={36} 
										iconType="circle"
										wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}
									/>
								</PieChart>
							</ResponsiveContainer>
						) : (
							<div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">
								No orders yet
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Recent Orders Table */}
			<div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
				<div className="p-6 border-b border-slate-100">
					<h3 className="text-lg font-bold text-slate-900 tracking-tight">Recent Transactions</h3>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="bg-slate-50 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-100">
								<th className="px-6 py-4">Customer</th>
								<th className="px-6 py-4">Date</th>
								<th className="px-6 py-4">Amount</th>
								<th className="px-6 py-4">Status</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{recentOrders.length > 0 ? (
								recentOrders.map((order) => (
									<tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
										<td className="px-6 py-4">
											<p className="font-bold text-slate-900 text-sm">{order.name}</p>
											<p className="text-xs font-medium text-slate-500 mt-0.5">{order.email}</p>
										</td>
										<td className="px-6 py-4 text-sm font-medium text-slate-600">
											{order.date}
										</td>
										<td className="px-6 py-4 font-bold text-slate-900 text-sm">
											${order.amount?.toFixed(2)}
										</td>
										<td className="px-6 py-4">
											<span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${
												order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
												order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
												'bg-yellow-100 text-yellow-700'
											}`}>
												{order.status || 'Pending'}
											</span>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="4" className="px-6 py-8 text-center text-slate-400 font-medium">
										No recent transactions found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default DashboardAnalytics
