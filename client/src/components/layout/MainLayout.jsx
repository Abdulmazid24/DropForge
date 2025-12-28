import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { path: '/dashboard/orders', label: 'Orders', icon: ShoppingCart },
        { path: '/dashboard/products', label: 'Products', icon: ShoppingBag },
        { path: '/dashboard/customers', label: 'Customers', icon: Users },
        { path: '/dashboard/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-dark-bg text-gray-100 overflow-hidden font-sans">
            {/* Sidebar (Desktop) */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 260 : 80 }}
                className="hidden lg:flex flex-col glass border-r border-glass-border relative z-20"
            >
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                        <Box className="w-8 h-8 text-accent transform rotate-12" />
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-purple"
                            >
                                DropForge
                            </motion.span>
                        )}
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${location.pathname === item.path
                                    ? 'bg-gradient-to-r from-accent/20 to-accent-purple/10 text-accent font-semibold'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5 min-w-[20px]" />
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                            {location.pathname === item.path && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute left-0 top-0 w-1 h-full bg-accent rounded-r-full"
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-glass-border">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 w-full text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5 min-w-[20px]" />
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                Logout
                            </motion.span>
                        )}
                    </button>

                    {isSidebarOpen && (
                        <div className="mt-4 px-4 py-3 bg-slate-900/50 rounded-xl border border-glass-border flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-purple-500 flex items-center justify-center text-xs font-bold">
                                {user?.name?.[0] || 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-semibold truncate">{user?.name}</p>
                                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-10 bg-slate-800 border border-slate-600 rounded-full p-1 text-xs hover:bg-slate-700 transition-colors"
                >
                    {isSidebarOpen ? '<' : '>'}
                </button>
            </motion.aside>

            {/* Mobile Header & Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Background Gradient Mesh */}
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative z-10 scrollbar-thin">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
