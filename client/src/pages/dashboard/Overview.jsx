import { motion } from 'framer-motion';
import {
    TrendingUp,
    Package,
    ShoppingCart,
    ShoppingBag,
    DollarSign
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const stats = [
    { title: 'Total Sales', value: '৳ 1,24,500', change: '+12.5%', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { title: 'Total Orders', value: '1,452', change: '+8.2%', icon: ShoppingCart, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Products', value: '354', change: '+2.1%', icon: Package, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { title: 'Net Profit', value: '৳ 45,200', change: '+18.3%', icon: TrendingUp, color: 'text-accent', bg: 'bg-accent/10' },
];

const data = [
    { name: 'Jan', sales: 4000, profit: 2400 },
    { name: 'Feb', sales: 3000, profit: 1398 },
    { name: 'Mar', sales: 2000, profit: 9800 },
    { name: 'Apr', sales: 2780, profit: 3908 },
    { name: 'May', sales: 1890, profit: 4800 },
    { name: 'Jun', sales: 2390, profit: 3800 },
    { name: 'Jul', sales: 3490, profit: 4300 },
];

const Overview = () => {
    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Dashboard Overview
                </h1>
                <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6 hover:border-accent/30 transition-colors cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-800 text-green-400">
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-gray-400 text-sm">{stat.title}</h3>
                        <p className="text-2xl font-bold mt-1 group-hover:text-glow transition-all">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-6 lg:col-span-2"
                >
                    <h3 className="text-xl font-bold mb-6">Revenue Analytics</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818CF8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                                <XAxis dataKey="name" stroke="#94A3B8" />
                                <YAxis stroke="#94A3B8" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#38BDF8"
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="profit"
                                    stroke="#818CF8"
                                    fillOpacity={1}
                                    fill="url(#colorProfit)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-6"
                >
                    <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                    <ShoppingBag className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">New order #ORD-00{i}</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Overview;
