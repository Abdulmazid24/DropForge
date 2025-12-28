import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Package } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import Modal from '../../components/ui/Modal';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Order Modal State
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderForm, setOrderForm] = useState({
        customerName: '',
        customerPhone: '',
        address: '',
        city: '',
        quantity: 1
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
            } catch (error) {
                toast.error('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleOrderClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                orderItems: [{ product: selectedProduct._id, qty: parseInt(orderForm.quantity) }],
                shippingAddress: {
                    name: orderForm.customerName,
                    phone: orderForm.customerPhone,
                    address: orderForm.address,
                    city: orderForm.city
                },
                paymentMethod: 'COD'
            };

            await api.post('/orders', payload);
            toast.success('Order placed successfully!');
            setIsModalOpen(false);
            setOrderForm({ customerName: '', customerPhone: '', address: '', city: '', quantity: 1 });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        }
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Products Inventory
                    </h1>
                    <p className="text-gray-400">Manage your dropshipping catalog</p>
                </div>
                <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-dark-bg font-bold px-4 py-2.5 rounded-xl transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>Import Product</span>
                </button>
            </header>

            {/* Filters */}
            <div className="glass-card p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 hover:text-white transition-colors">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    [...Array(8)].map((_, i) => (
                        <div key={i} className="glass-card h-80 animate-pulse bg-slate-800/50"></div>
                    ))
                ) : filteredProducts.map((product, i) => (
                    <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card overflow-hidden group hover:border-accent/40 transition-colors"
                    >
                        <div className="h-48 bg-slate-800 relative overflow-hidden">
                            {/* Placeholder for Product Image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-700">
                                <Package className="w-16 h-16 opacity-50" />
                            </div>
                            <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-accent">
                                {product.stockStatus === 'in_stock' ? 'In Stock' : 'Stock Out'}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg truncate mb-1" title={product.title}>{product.title}</h3>
                            <div className="flex justify-between items-end mt-4">
                                <div>
                                    <p className="text-xs text-gray-500">Cost</p>
                                    <p className="font-mono text-gray-400">৳{product.costPrice}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-accent">Selling Price</p>
                                    <p className="font-bold font-mono text-xl text-white">৳{product.sellingPrice}</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-700/50 flex gap-2">
                                <button className="flex-1 py-2 bg-slate-800 rounded-lg text-sm hover:bg-slate-700 transition-colors">Edit</button>
                                <button
                                    onClick={() => handleOrderClick(product)}
                                    className="flex-1 py-2 bg-accent/20 text-accent rounded-lg text-sm hover:bg-accent/30 transition-colors"
                                >
                                    Add Order
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">No products found.</p>
                </div>
            )}

            {/* Order Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Order: ${selectedProduct?.title}`}
            >
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-400">Customer Name</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 mt-1 focus:border-accent"
                            value={orderForm.customerName}
                            onChange={e => setOrderForm({ ...orderForm, customerName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400">Phone</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 mt-1 focus:border-accent"
                            value={orderForm.customerPhone}
                            onChange={e => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-400">City</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 mt-1 focus:border-accent"
                                value={orderForm.city}
                                onChange={e => setOrderForm({ ...orderForm, city: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">Quantity</label>
                            <input
                                required
                                type="number"
                                min="1"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 mt-1 focus:border-accent"
                                value={orderForm.quantity}
                                onChange={e => setOrderForm({ ...orderForm, quantity: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400">Detailed Address</label>
                        <textarea
                            required
                            rows="2"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 mt-1 focus:border-accent"
                            value={orderForm.address}
                            onChange={e => setOrderForm({ ...orderForm, address: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-accent text-dark-bg font-bold rounded-xl hover:bg-accent/90 transition"
                        >
                            Confirm Order
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Products;
