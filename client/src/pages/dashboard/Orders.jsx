import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, MoreHorizontal, Truck, CheckCircle, Clock } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Fetch orders based on role. admin gets all, customer gets own.
                // The endpoint /api/orders handles admin check internally.
                const { data } = await api.get('/orders');
                setOrders(data);
            } catch (error) {
                toast.error('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <span className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full text-xs font-bold border border-yellow-500/20"><Clock className="w-3 h-3" /> Pending</span>;
            case 'shipped':
                return <span className="flex items-center gap-1 text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-full text-xs font-bold border border-blue-500/20"><Truck className="w-3 h-3" /> Shipped</span>;
            case 'delivered':
                return <span className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-500/20"><CheckCircle className="w-3 h-3" /> Delivered</span>;
            default:
                return <span className="text-gray-400 bg-gray-500/10 px-2.5 py-1 rounded-full text-xs font-bold">{status}</span>;
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Order Management
                    </h1>
                    <p className="text-gray-400">Track and manage customer orders</p>
                </div>
            </header>

            {/* Filter Bar */}
            <div className="glass-card p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Phone..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Status
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-800/50 border-b border-gray-700">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-400">Order ID</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Date</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Customer</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Total Profit</th>
                                <th className="p-4 text-sm font-semibold text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">Loading orders...</td>
                                </tr>
                            ) : orders.map((order, i) => (
                                <motion.tr
                                    key={order._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-white/5 transition-colors"
                                >
                                    <td className="p-4 font-mono text-sm text-accent">{order.localOrderId}</td>
                                    <td className="p-4 text-sm text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <p className="font-medium text-white">{order.customerInfo?.name}</p>
                                        <p className="text-xs text-gray-500">{order.customerInfo?.phone}</p>
                                    </td>
                                    <td className="p-4">{getStatusBadge(order.status)}</td>
                                    <td className="p-4 font-mono font-bold text-emerald-400">৳{order.profit}</td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-slate-700 rounded-lg text-gray-400 hover:text-white transition-colors">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!loading && orders.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No orders found yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
