import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Phone, Save, Loader2 } from 'lucide-react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Settings = () => {
    const { user, login } = useAuth(); // We might need to update context user after profile update?
    // Note: In a real app, we should have a 'updateUser' in context or refresh profile.

    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password && formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: formData.name,
                phone: formData.phone
            };
            if (formData.password) payload.password = formData.password;

            const { data } = await api.put('/users/profile', payload);

            // Should verify if backend returns new token and user
            if (data.token) {
                localStorage.setItem('token', data.token);
                // Trigger a reload or update context (simplest is reload for now to refresh global state)
                window.location.reload();
            }
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Account Settings
                </h1>
                <p className="text-gray-400">Manage your profile and security preferences</p>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-700/50">
                        <h3 className="text-lg font-semibold mb-4 text-white">Security</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                    <input
                                        type="password"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent"
                                        placeholder="Leave blank to keep current"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                    <input
                                        type="password"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent"
                                        placeholder="Confirm new password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-accent text-dark-bg font-bold px-6 py-3 rounded-xl hover:bg-accent/90 transition flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Settings;
