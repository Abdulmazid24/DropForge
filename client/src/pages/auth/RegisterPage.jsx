import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        setIsLoading(true);
        try {
            await api.post('/users', {
                name: formData.name,
                phone: formData.phone,
                password: formData.password
            });
            toast.success('Account created! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-dark-bg text-gray-100 overflow-hidden font-sans">
            <Toaster position="top-right" />

            {/* Left Side - Visuals */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex w-1/2 relative flex-col justify-center items-center p-12 overflow-hidden"
            >
                <div className="absolute inset-0 bg-hero-glow opacity-40 blur-3xl scale-150 animate-pulse"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-purple text-glow">
                        Join DropForge
                    </h1>
                    <p className="text-xl text-gray-400 max-w-md">
                        Start your dropshipping journey with the most advanced platform.
                    </p>
                </div>
            </motion.div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-dark-bg relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card w-full max-w-md p-8 relative z-10"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                        <p className="text-gray-400">Sign up to get started</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    className="w-full bg-secondary/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-all"
                                    placeholder="John Doe"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    className="w-full bg-secondary/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-all"
                                    placeholder="017..."
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                <input
                                    type="password"
                                    className="w-full bg-secondary/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-all"
                                    placeholder="••••••••"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                <input
                                    type="password"
                                    className="w-full bg-secondary/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-all"
                                    placeholder="••••••••"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-accent to-accent-purple text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex justify-center items-center"
                        >
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Register'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Already have an account? <Link to="/login" className="text-accent hover:underline">Sign in</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RegisterPage;
