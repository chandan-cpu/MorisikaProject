import React, { useState } from 'react';
import {
    ShoppingBag,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp,
    TrendingDown,
    Calendar,
    DollarSign,
    Package,
    Truck
} from 'lucide-react';

const OrderStatistics = () => {
    // Sample order data
    const [orders] = useState([
        { id: 1, customer: "Rahul Sharma", amount: 1299, status: "delivered", date: "2024-03-15", payment: "UPI" },
        { id: 2, customer: "Priya Patel", amount: 1348, status: "pending", date: "2024-03-15", payment: "Card" },
        { id: 3, customer: "Amit Kumar", amount: 899, status: "cancelled", date: "2024-03-14", payment: "Cash" },
        { id: 4, customer: "Neha Singh", amount: 449, status: "delivered", date: "2024-03-14", payment: "UPI" },
        { id: 5, customer: "Vikram Mehta", amount: 1148, status: "pending", date: "2024-03-13", payment: "Card" },
        { id: 6, customer: "Anjali Desai", amount: 1599, status: "delivered", date: "2024-03-13", payment: "UPI" },
        { id: 7, customer: "Rajesh Kumar", amount: 699, status: "cancelled", date: "2024-03-12", payment: "Cash" },
        { id: 8, customer: "Pooja Sharma", amount: 899, status: "delivered", date: "2024-03-12", payment: "Card" },
        { id: 9, customer: "Suresh Reddy", amount: 1249, status: "pending", date: "2024-03-11", payment: "UPI" },
        { id: 10, customer: "Deepa Nair", amount: 749, status: "delivered", date: "2024-03-11", payment: "Card" },
        { id: 11, customer: "Arjun Singh", amount: 1999, status: "pending", date: "2024-03-10", payment: "UPI" },
        { id: 12, customer: "Kavita Joshi", amount: 549, status: "delivered", date: "2024-03-10", payment: "Cash" },
    ]);

    // Calculate statistics
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
    const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;

    const totalRevenue = orders
        .filter(order => order.status === 'delivered')
        .reduce((sum, order) => sum + order.amount, 0);

    const pendingRevenue = orders
        .filter(order => order.status === 'pending')
        .reduce((sum, order) => sum + order.amount, 0);

    // Status colors
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        delivered: 'bg-green-100 text-green-800 border-green-200',
        cancelled: 'bg-red-100 text-red-800 border-red-200'
    };

    // State for date filter
    const [dateFilter, setDateFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Filter orders based on selected filters
    const filteredOrders = orders.filter(order => {
        if (statusFilter !== 'all' && order.status !== statusFilter) return false;
        if (dateFilter === 'today') {
            const today = new Date().toISOString().split('T')[0];
            return order.date === today;
        }
        if (dateFilter === 'week') {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(order.date) >= weekAgo;
        }
        if (dateFilter === 'month') {
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return new Date(order.date) >= monthAgo;
        }
        return true;
    });

    // Stat Card Component
    const StatCard = ({ icon: Icon, label, value, subValue, color, trend, trendValue }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span>{trendValue}%</span>
                    </div>
                )}
            </div>
            <div className="mt-4">
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
                {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Order Statistics Dashboard</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Real-time overview of your order status</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <StatCard
                        icon={ShoppingBag}
                        label="Total Orders"
                        value={totalOrders}
                        subValue="All time orders"
                        color="bg-blue-500"
                        trend="up"
                        trendValue="12"
                    />

                    <StatCard
                        icon={Clock}
                        label="Pending Orders"
                        value={pendingOrders}
                        subValue={`₹${pendingRevenue.toLocaleString()} value`}
                        color="bg-yellow-500"
                        trend="down"
                        trendValue="5"
                    />

                    <StatCard
                        icon={CheckCircle}
                        label="Delivered Orders"
                        value={deliveredOrders}
                        subValue={`₹${totalRevenue.toLocaleString()} revenue`}
                        color="bg-green-500"
                        trend="up"
                        trendValue="18"
                    />

                    <StatCard
                        icon={XCircle}
                        label="Cancelled Orders"
                        value={cancelledOrders}
                        subValue={`${((cancelledOrders / totalOrders) * 100).toFixed(1)}% of total`}
                        color="bg-red-500"
                        trend="down"
                        trendValue="3"
                    />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <DollarSign className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-800">₹{totalRevenue.toLocaleString()}</p>
                                <p className="text-xs text-green-600 mt-1">↑ 15% from last month</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-100 rounded-lg">
                                <Package className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Average Order Value</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    ₹{Math.round(totalRevenue / deliveredOrders || 0).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Per delivered order</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <Truck className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Success Rate</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {((deliveredOrders / totalOrders) * 100).toFixed(1)}%
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Delivery success rate</p>
                            </div>
                        </div>
                    </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-semibold text-gray-800">Order History</h2>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>

                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto -mx-0">
                    <table className="w-full min-w-[600px]">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">#{order.id}</td>
                                        <td className="py-4 px-6 text-sm text-gray-700">{order.customer}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {new Date(order.date).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">₹{order.amount}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500">{order.payment}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[order.status]}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>

                {/* Table Footer with Summary */}
                <div className="bg-gray-50 px-4 sm:px-6 py-4 border-t border-gray-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                        <p className="text-sm text-gray-500">
                            Showing {filteredOrders.length} of {totalOrders} orders
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                <span className="text-sm text-gray-600">Pending: {pendingOrders}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span className="text-sm text-gray-600">Delivered: {deliveredOrders}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="text-sm text-gray-600">Cancelled: {cancelledOrders}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Distribution Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-800 mb-4">Status Distribution</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Pending</span>
                                    <span className="font-medium">{((pendingOrders / totalOrders) * 100).toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(pendingOrders / totalOrders) * 100}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Delivered</span>
                                    <span className="font-medium">{((deliveredOrders / totalOrders) * 100).toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(deliveredOrders / totalOrders) * 100}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Cancelled</span>
                                    <span className="font-medium">{((cancelledOrders / totalOrders) * 100).toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(cancelledOrders / totalOrders) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Pending Value</p>
                                <p className="text-xl font-bold text-yellow-600">₹{pendingRevenue.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Delivered Value</p>
                                <p className="text-xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Cancelled Value</p>
                                <p className="text-xl font-bold text-red-600">
                                    ₹{orders.filter(o => o.status === 'cancelled').reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Completion Rate</p>
                                <p className="text-xl font-bold text-blue-600">
                                    {((deliveredOrders / (totalOrders - cancelledOrders)) * 100 || 0).toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>

    );
};

export default OrderStatistics;