import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, MoreHorizontal, Truck, CheckCircle, Clock, Package } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import Modal from '../../components/ui/Modal';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Details Modal
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

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
                                        <button
                                            onClick={() => handleViewOrder(order)}
                                            className="p-2 hover:bg-slate-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                                        >
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

            {/* Order Details Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Order Details: ${selectedOrder?.localOrderId}`}
            >
                {selectedOrder && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-4 bg-slate-800 rounded-xl">
                                <h4 className="text-gray-400 mb-2">Customer</h4>
                                <p className="font-bold text-white text-lg">{selectedOrder.customerInfo?.name}</p>
                                <p className="text-gray-400">{selectedOrder.customerInfo?.phone}</p>
                                <p className="text-gray-400 mt-1">{selectedOrder.customerInfo?.address}, {selectedOrder.customerInfo?.city}</p>
                            </div>
                            <div className="p-4 bg-slate-800 rounded-xl">
                                <h4 className="text-gray-400 mb-2">Order Info</h4>
                                <p className="flex justify-between"><span>Status:</span> <span className="font-bold text-accent">{selectedOrder.status}</span></p>
                                <p className="flex justify-between mt-1"><span>Profit:</span> <span className="font-bold text-emerald-400">৳{selectedOrder.profit}</span></p>
                                <p className="flex justify-between mt-1"><span>Date:</span> <span>{new Date(selectedOrder.createdAt).toLocaleDateString()}</span></p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-3 border-b border-gray-700 pb-2">Items</h4>
                            {selectedOrder.orderItems?.map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                                            <Package className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            {/* Product link or name - assuming item.product is populated or we have title */}
                                            <p className="font-medium">Product ID: {item.product}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Orders;
